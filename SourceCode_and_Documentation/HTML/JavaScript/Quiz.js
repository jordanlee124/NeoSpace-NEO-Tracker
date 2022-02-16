
(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label class="question">
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide" style="height:585px;">
              <div style="width: auto; " class="question"> ${currentQuestion.question} </div>
              <div class="answers" style="width:800px;"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
          document.getElementById("totalscore").innerHTML = `Score: ${numCorrect}/6`;
          document.getElementById("totalscore").style.visibility = "visible";
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {

        question: "What does NEO stand for?",
        answers: {
          a: "Near Earth object",
          b: "Network-Enabled Operations",
          c: "Noncombatant Evacuation Operation",
          d: "New Economic Order"
        },
        correctAnswer: "a"
      },
      {
        question: "Where are most near earth asteroids formed today?",
        answers: {
          a: "In another galaxy",
          b: "Between Mars and Jupiter",
          c: "As Debris from Earth",
          d: "From Mercury, Venus, Earth and Mars"
        },
        correctAnswer: "d"
      },
      {
        question: "What sparks intrest into the study of NEOs from scientists?",
        answers: {
          a: "NEOs are just interesting",
          b: "Recent demand from the market",
          c: "Affects it has on satellites",
          d: "All of the above"
        },
        correctAnswer: "d"
      },
    
        {
            question: "What perecent of living organsims did the astreoid that struck near Mexico 65 million years ago wipe out?",
            answers: {
            a: "15.21%",
            b: "48%",
            c: "100%",
            d: "75%"
            },
            correctAnswer: "d"
        },
        {
            question: "What can be carried out to erdicate the risk of NEOs if they impose a risk?",
            answers: {
            a: "nuclear fusion, use of high speed electrons ",
            b: "changing its velocity",
            c: "solar sails that force sunlight to move it from Earth",
            d: "all of the above "
            },
            correctAnswer: "d"
        },
        {
            question: "An astroid larger then 100m is set to reach Earth surface every what years?",
            answers: {
            a: "Never",
            b: "10,000 years",
            c: "100 years",
            d: "5000 years"
            },
            correctAnswer: "b"
        }
    ];
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);

    // document.getElementById("totalscore").style.display = "block";
  })();


document.getElementById("totalscore").style.visibility = "visible";
//document.getElementById("finialscore").style.display = "block";
  

