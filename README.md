# Backend-API-for-an-online-learning-platform

---

![](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fzojuy79lo3fn3qdt7g6p.png)

<p>LearnHub Backend powers an online learning platform where users purchase courses, stream video lessons, and engage through reviews, ratings, and comments. Built with Node.js, Express, and MongoDB, this project is currently under active development as we work towards a complete, scalable education solution.</p>

`Author:`

```json
{
"firstName"  : "Mohammad"
"lastName"   : "Naghavi Olyaei"
"userName"   : "mohammadna62"
}
```

![NodeJS](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

---

`Sample Code`

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

## List

Ordered:

1. NodeJs
2. ExpressJS
3. Javascript
4. MongoDB

Unordered:

- BackEnd (`NodeJS`,`ExpressJS`)

---

[learn about NodeJs](https://nodejs.org/en)

[learn about ExpressJS](https://expressjs.com/)

[learn about javascript](https://www.javascript.com/)

[learn about Data Base](https://www.mongodb.com/)

---
