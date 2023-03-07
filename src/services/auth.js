const usersModel = require("../models/users");
const otpModel = require("../models/otp");
const generateOTP = require("../helper/generateOTP");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const { randomBytes } = require("crypto");
const nodemailer = require("nodemailer");
const userAuthServices = {};

userAuthServices.register = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      let otp;
      let user;
      let hashedPassword;
      const salt = randomBytes(32);

      if (params.password) {
        hashedPassword = await argon2.hash(params.password, { salt });
      }

      user = await usersModel().find({
        email: params.email.toLowerCase(),
      });
      if (user.length) {
        resolve("User with email already exists");
      } else {
        user = await usersModel().create({
          email: params.email.trim(),
          password: hashedPassword,
        });

        otp = generateOTP(1000, 9999);

        await otpModel().findOneAndUpdate(
          {
            email: params.email,
          },
          {
            otp: otp,
            $inc: { attempts: 1 },
          },
          {
            upsert: true,
          }
        );

        const output = `
      <div style="font-family: Helvetica,Arial,sans-serif;">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <p>Hi,</p>
    <p>Use the following OTP to complete your Sign Up procedures.</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
  </div>
</div>`;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.email",
          // port: 587,
          // secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.PASS,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        let mailOptions = {
          to: params.email, // list of receivers
          subject: "Your OTP to signup on Tasks API", // Subject line
          html: output, // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
        });

        resolve("OTP sent on email for verification");
      }
    } catch (error) {
      reject(error);
    }
  });
};

userAuthServices.findUser = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await usersModel().find({
        email: params.email,
        verified: true,
      });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

userAuthServices.login = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data;
      const user = await usersModel().findOne({
        email: params.email,
        verified: true,
      });
      if (user) {
        const access_token = jwt.sign({ user: user._id }, "newSecretCheck", {
          expiresIn: "5m",
        });

        data = await usersModel().updateOne(
          { _id: user._id },
          { token: access_token, tokenCreatedAt: Date.now() }
        );
        resolve("User Logged In!");
      } else {
        resolve("User not found");
      }
    } catch (error) {
      reject(error);
    }
  });
};

userAuthServices.verify = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = await otpModel().findOne({
        otp: params.otp,
        email: params.email,
        used: false,
      });

      if (check) {
        await otpModel().updateOne({ _id: check._id }, { used: true });
        await usersModel().updateOne(
          { email: params.email },
          { verified: true }
        );
        resolve("User Verified");
      } else {
        resolve("Please check your details and try again");
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = userAuthServices;
