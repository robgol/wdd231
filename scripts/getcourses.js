const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const courseoutput=document.querySelector("#courses-list")
const courseDetails=document.querySelector("#course-details")

document.querySelector('#all').addEventListener('click', () => {
    displayCourses(courses)
});

document.querySelector('#wdd').addEventListener('click', () => {
    const result = courses.filter((course) => course.subject === 'WDD');
    displayCourses(result)
});

document.querySelector('#cse').addEventListener('click', () => {
    const result = courses.filter((course) => course.subject === 'CSE');
    displayCourses(result)
});

function displayCourseDetails(course) {
    const dialog = document.querySelector('#course-details');
    dialog.innerHTML = `
        <button id="modal">X</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Tecnologies</strong>: ${course.technology.join(', ')}</p>
    `;

    dialog.showModal();

    document.querySelector('#modal').addEventListener('click', () => {
        dialog.close();
    });
}


function displayCourses(filteredcourses) {
    courseoutput.innerHTML = '';
    filteredcourses.forEach(course => {
      console.log(course)
  
      const courseCard = document.createElement('div')
      switch (course.completed) {
        case true:
            courseCard.className = "complete"
        break;
        default:
            courseCard.className = "needed"
      }
  
      courseCard.innerHTML=`${course.subject} ${course.number}`

      courseCard.addEventListener('click', () => {
        displayCourseDetails(course);
      });
      courseoutput.appendChild(courseCard)

  
    });


    let totalCredits = filteredcourses.reduce((acc, course) => acc + course.credits, 0);
    document.querySelector('#total-credits').innerHTML = `The total number of credit for the listed courses above is ${totalCredits}`

  }
  
  displayCourses(courses)





