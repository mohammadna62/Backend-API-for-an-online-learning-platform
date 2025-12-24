const coursesName = await courseModel.find({});  // گرفتن همه دوره‌ها

let coursesTitles = [];
let courseCountOfTitle = {};

// پر کردن لیست نام دوره‌ها
coursesName.forEach(course => {
    coursesTitles.push(course.href);
    courseCountOfTitle[course.href] = 0; // مقدار اولیه
});

// شمارش کاربران برای هر دوره
for (const name of coursesTitles) {
    // پیدا کردن آی‌دی دوره مربوط به این href
    const course = coursesName.find(c => c.href === name);
    if (course) {
        // تعداد ثبت‌نام‌ها در این دوره
        const count = await courseUserModel.countDocuments({ course: course._id });
        courseCountOfTitle[name] = count;
        console.log(name, count);
    }
}

console.log(courseCountOfTitle);
