# 🎓 Backend API for an Online Learning Platform

---

![📚 Banner](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fzojuy79lo3fn3qdt7g6p.png)

💡 **LearnHub Backend** powers an online learning platform where users purchase courses, stream video lessons, and engage through reviews, ratings, and comments. Built with **Node.js**, **Express**, and **MongoDB**, this project is under active development toward a complete and scalable education solution.

---

## 👤 Author

```json
{
  "firstName": "Mohammad",
  "lastName": "Naghavi Olyaei",
  "userName": "mohammadna62"
}
```

---

## 🛠️ Technologies & Packages

### 💻 Core Technologies
![⚡ NodeJS](https://img.shields.io/badge/Node%20JS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![🚀 ExpressJS](https://img.shields.io/badge/Express%20JS-000000?style=for-the-badge&logo=express&logoColor=white)
![🌱 MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![🟨 JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### 📦 Additional Packages Used
![🔒 bcrypt](https://img.shields.io/badge/bcrypt-5.1.1-blue?style=for-the-badge)
![📝 body-parser](https://img.shields.io/badge/body--parser-1.20.2-green?style=for-the-badge)
![🌐 cors](https://img.shields.io/badge/cors-2.8.5-lightgrey?style=for-the-badge)
![💛 dotenv](https://img.shields.io/badge/dotenv-16.3.1-yellow?style=for-the-badge&logo=dotenv&logoColor=black)
![✅ fastest-validator](https://img.shields.io/badge/fastest--validator-1.17.0-orange?style=for-the-badge)
![🔑 jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-9.0.1-red?style=for-the-badge)
![📦 mongoose](https://img.shields.io/badge/mongoose-7.4.3-800000?style=for-the-badge)
![📁 multer](https://img.shields.io/badge/multer-1.4.5--lts.1-ff8800?style=for-the-badge)
![✉️ nodemailer](https://img.shields.io/badge/nodemailer-6.9.4-9cf?style=for-the-badge)

---

## 💡 Sample Code

```javascript
exports.create = async (req, res) => {
  const validationResult = categoryValidator(req.body);
  if (validationResult != true) {
    return res.status(422).json(validationResult);
  }
  
  const { title, href } = req.body;
  const category = await categoryModel.create({ title, href });

  return res.status(201).json(category);
};
___;
```

---

## 📋 Lists

### ✅ Ordered:
1. ⚡ NodeJS  
2. 🚀 ExpressJS  
3. 🟨 JavaScript  
4. 🌱 MongoDB  

### 🔹 Unordered:
- Backend (`NodeJS`, `ExpressJS`)

---

## 🌐 Learn More

- [🌟 Learn NodeJS](https://nodejs.org/en)  
- [🌟 Learn ExpressJS](https://expressjs.com/)  
- [🌟 Learn JavaScript](https://www.javascript.com/)  
- [🌟 Learn MongoDB](https://www.mongodb.com/)  

---

## 📝 License

This project is licensed under the **ISC License**.
