let activityStudents = JSON.parse(localStorage.getItem('activityStudents')) || {
    "活动1": [],
    "活动2": [],
    "活动3": []
};

// 获取表单元素
const registerForm = document.getElementById('registerForm');
const activitySelect = document.getElementById('activitySelect');

registerForm.addEventListener('submit',function(e){
    e.preventDefault(); // 阻止表单默认提交刷新AI
    const studentname = document.getElementById('studentname').value.trim();
    const studentId = document.getElementById('studentId').value.trim();
    const college = document.getElementById('college').value.trim();
    const className = document.getElementById('className').value.trim();
    //获取学生信息
    const studentInfo = {
        studentname,
        studentId,
        college,
        className
    };
    // 验证学生信息是否为空
    if (!studentname || !studentId || !college || !className) {
        alert('请填写完整的个人信息');
        return;
    }
    //获取选择的活动名称
    const selectedActivity = activitySelect.value;

    if(!selectedActivity||!activityStudents.hasOwnProperty(selectedActivity)){
        alert('请选择有效的活动');
        return;
    }
    // 存入对应活动数组
    activityStudents[selectedActivity].push(studentInfo);

    // 关键：将最新数据存入localStorage（覆盖旧数据）AI
    localStorage.setItem('activityStudents', JSON.stringify(activityStudents));
    
    alert(`报名成功！已加入【${selectedActivity}】`);
    
    //清空表单
    registerForm.reset();
})