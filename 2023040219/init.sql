CREATE DATABASE IF NOT EXISTS RegistrationSystem4SNC
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- 授予 root 用户从任何主机访问的权限
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123' WITH GRANT OPTION;
FLUSH PRIVILEGES;

USE RegistrationSystem4SNC;

CREATE TABLE IF NOT EXISTS events (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '活动ID',
    title VARCHAR(200) NOT NULL COMMENT '活动标题',
    status TINYINT NOT NULL DEFAULT 0 COMMENT '活动状态：0-未开始，1-进行中，2-已结束，3-已取消',
    location VARCHAR(200) COMMENT '活动地点',
    start_time DATETIME NOT NULL COMMENT '活动开始时间',
    description TEXT COMMENT '活动描述',
    signup_deadline DATETIME NOT NULL COMMENT '报名截止时间',
    CONSTRAINT chk_deadline_before_start CHECK (signup_deadline < start_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '社团活动信息表';

CREATE TABLE IF NOT EXISTS form (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '报名记录ID',
    event_id INT NOT NULL COMMENT '关联的活动ID',
    student_name VARCHAR(50) NOT NULL COMMENT '学生姓名',
    student_id VARCHAR(20) NOT NULL COMMENT '学号',
    college VARCHAR(100) NOT NULL COMMENT '学院',
    phone VARCHAR(20) NOT NULL COMMENT '联系电话',
    remarks TEXT COMMENT '备注',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '报名提交时间',
    CONSTRAINT fk_form_event FOREIGN KEY (event_id)
    REFERENCES events(id)
    ON DELETE CASCADE,
    UNIQUE INDEX idx_event_student (event_id, student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '活动报名记录表';

INSERT INTO events (id, title, status, location, start_time, description, signup_deadline) VALUES 
(1, 'X-ware服务', 2, '319', '2025-11-12 18:00:00', 'X-ware服务是学生网络中心为全校同学义务提供的电脑维修等服务，距今已有20年的历史。我们的主要工作是硬件基础维修，同时我们也会提出一些电脑硬件升级的建议，还会对硬件故障进行排查等等。我们还可以装系统，包括Windows，虚拟机和双系统，也可以安装一些软件哦。', '2025-11-11 00:00:00'),
(2, '笔记本知识讲座', 2, '319', '2025-11-14 18:00:00', '笔记本知识讲座是面对大一新生刚入学后对于笔记本知识，校园常用网络的了解与使用等知识的需求，为帮助同学们快速地了解而开展的活动。活动主要为大一新生介绍一些笔记本的基础知识和提出一些购买建议，并且普及校园网的相关知识，校园网的使用方法等等。', '2025-11-13 00:00:00'),
(3, 'Let\'s Code', 0, '319', '2025-12-03 14:00:00', '"Let\'s Code" 是一项新的编程技术培训活动。在当今数字化的时代，编程技能已经成为越来越重要的技能。该活动以技术沙龙的形式为同学们传授基础的编程技术和知识，同时也建立渠道为有需求的同学提供帮助。', '2025-12-02 00:00:00'),
(4, '网络文明周', 0, '319', '2025-12-15 15:00:00', '网络文明周活动于2007年4月开始举办，主要目的是宣传网络文明知识，开展网络道德及网络法制教育，倡导文明上网；普及电脑及网络知识，调动学生学习计算机网络知识的积极性与主动性；通过丰富多彩的活动形式，活跃校园文化。', '2025-12-03 00:00:00'),
(5, '烟花三月', 2, '319', '2025-11-12 16:00:00', '首届"烟花三月"大学生原创风采展示活动于2004年3月启动，至今已经举办了20届。活动目的在于展示大学生在写作摄影等方面的能力，引领健康向上的大学校园文化，对大学生进行文化内涵方面的推荐和引导。', '2025-11-11 00:00:00');
