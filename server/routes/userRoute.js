import express from 'express';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../mongodb/models/user.js';

import jwt from 'jsonwebtoken';
import multer from 'multer';
dotenv.config();

const router = express.Router();

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    UserModel.findOne({ email })
      .then(function (user) {
        console.log(1);
        bcrypt
          .compare(password, user.password)
          .then(function (passwordCheck) {
            console.log(passwordCheck);
            if (!passwordCheck) return res.status(402).send('wrong!');

            //create JWT TOKEN
            const token = jwt.sign(
              {
                userId: user._id,
                email: user.email,
              },
              'WNi3oF3NfduzvwUiOPlnDdUUjIlMcv7fX28ms3udpPM',

              { expiresIn: '24h' }
            );
            return res.status(200).send({
              msg: 'Login Successfully',
              _id: user._id,
              token,
            });
          })
          .catch(function (error) {
            console.log(error);
            return res.status(401).send('Password is not correct');
          });
      })
      .catch(function (error) {
        return res.status(409).send('email not found');
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

router.route('/login').post(async function (req, res) {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email: email });
    if (!user) return res.status(500).send('error');
    console.log(user.password);
    bcrypt.hash(password, 10).then(function (hashedPassword) {
      console.log(hashedPassword);
    });
    bcrypt
      .compare(password, user.password)
      .then(function (passwordCheck) {
        if (!passwordCheck) return res.status(402).send('wrong!');
        const token = jwt.sign(
          {
            userId: user._id,
            email: user.email,
          },
          'WNi3oF3NfduzvwUiOPlnDdUUjIlMcv7fX28ms3udpPM',

          { expiresIn: '24h' }
        );
        return res.status(201).send({
          msg: 'Login Successfully',
          _id: user._id,
          token,
        });
      })
      .catch(function (error) {
        return res.status(500).send('error');
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error });
  }
});

router.route('/createaccount').post(async function (req, res) {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const existEmail = new Promise(async function (resolve, reject) {
      const emailexist = await User.findOne({ email });

      if (emailexist) reject('Email already exists');

      resolve();
    });
    Promise.all([existEmail])
      .then(function () {
        bcrypt.hash(password, 10).then(async function (hashedPassword) {
          const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
          })
            .then(function () {
              res.status(200).send({ success: true });
            })
            .catch(function (error) {
              console.log(hashedPassword);
              console.log(error);
              res.status(500).send(error);
            });
        });
      })
      .catch(function (error) {
        return res.status(201).send('Email exist');
      });
  } catch (error) {
    console.log(error);
    res.status(501).send({ success: false, data: error });
  }
});

export default router;
