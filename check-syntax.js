// check-syntax.js
const fs = require('fs');
const path = require('path');

const vueFiles = [
  'src/views/ScheduleChecker.vue',
  'src/views/AddEvent.vue',
  'src/views/EditEvent.vue',
  'src/views/EventDetails.vue'
];

vueFiles.forEach(file => {
  const filePath = path.resolve(file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // تحقق من الوسوم غير المغلقة
    const unclosedTags = content.match(/<input[^>]>(?!\s<\/input>)/g);
    if (unclosedTags) {
      console.log(❌ وسوم غير مغلقة في ${file}:, unclosedTags);
    } else {
      console.log(✅ ${file}: لا توجد وسوم غير مغلقة);
    }
  } else {
    console.log(⚠  ${file}: غير موجود);
  }
});