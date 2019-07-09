/* Sudo Code */

// Maybe have a start page?

// Have questions and answers loaded into question, answers, correctanswer array.
// Set timer function for question timeout
// Write the first question and answers on the screen.
// Create click event to monitor the answer selected.
    // if correct
        // ++correct
        // go to next question  
    // else ++wrong or question timeout ++wrong
// Set timeout function to show the next question automatically
// 


var log = console.log;

    var quizQuestions = {

        question: {
            q0: "What is the approximate square root of pi?",
            q1: "What is the capital of Missouri?",
            q2: "Who starred as James Bond in 'The Living Daylights'?",
            q3: "What is the mascot of South Dakota State University?",
            q4: "What country does the Nile River NOT flow through?",
            q5: "What is the most populous country in South America?",
            q6: "What airport is the hub for United Airlines?",
        },

        selections: {
            q0: ['1.77', '2.20', '2.54', '1.45'],
            q1: ['St. Louis', 'Columbia', 'Lincoln', 'Jefferson City'],
            q2: ['Roger Moore', 'Timothy Dalton', 'Pierce Brosnan', 'Sean Connery'],
            q3: ['Jackrabbits', 'Bison', 'Coyotes', 'Tigers'],
            q4: ['Egypt', 'Djbouti', 'Sudan', 'Ethiopia'],
            q5: ['Argentina', 'Colombia', 'Bolivia', 'Brazil'],
            q6: ['Dallas Fort Worth', 'Laguardia', "O'Hare", 'Phoenix Sky Harbor']
        },

        /* correctAnswer: {
            q0: 'Test1',
            q1: 'Test 2',
            q2: 'Test 3',
            q3: 'Test1',
            q4: 'Test 4',
            q5: 'Test 2',
            q6: 'Test1',
        } */

        correctAnswer: [
            '1.77',
            'Jefferson City',
            'Timothy Dalton',
            'Jackrabbits',
            'Djbouti',
            'Brazil',
            "O'Hare",
        ]
    };

    // Writes the number of questions in the quiz to the page
    var totalQuestions = Object.values(quizQuestions.question).length;
    $('#total-questions').text(totalQuestions);

    // Sets the time variable to decrement by
    var time = 11;
    var questionInterval;

    // Function to clear the interval and set it back to 10
    function intervalReset() {
        clearInterval(questionInterval);
        time = 11;
        questionInterval = setInterval(timer, 1000);
    }

    // Decrements time on the page and goes to the next question if the time reaches zero
    function timer(){
        time--;
        $('#question-timer').text(':' + time);

        if(time === 0){

            stopInterval();
            clicked = true;

            // DRY code. Needs refinement
            var thisQuestionAnswer = Object.values(quizQuestions.correctAnswer)[questionNumber];
            getSelections();
            for(i = 0; i < callSelections.length; i++){
                if(thisQuestionAnswer === callSelections[i]){
                    $('.' + i).addClass('bg-success');
                }
            }

            questionNumber++
            unanswered++;
            questionChangeTimeout();
        }
    };

    // Stops the interval and clears it
    function stopInterval() {
        clearInterval(questionInterval);
    }

    intervalReset();

    var correct = 0;
    var wrong = 0;
    var unanswered = 0;
    var clicked = false;

    var questionNumber = 0;
    
    // Takes the current question from the object
    function writeQuestion(){
        var callQuestion = Object.values(quizQuestions.question)[questionNumber];
        $('#question').text(callQuestion);
    }

    // Writes the initial question to the page
    writeQuestion();
    
    // Takes the current selections from the object, loops through each, and writes each selection to a new li
    function getSelections() {
        callSelections = Object.values(quizQuestions.selections)[questionNumber]
        return callSelections
    }

    function writeSelections() {
        getSelections();
        for(i=0; i < callSelections.length; i++){
            $('#question-container').append('<li class="list-group-item selection ' +i+ '">' +callSelections[i]+ '</li>');   
        };
    };

    /* Try to create this as a function to it can be called back to above and below. */

    // function getQuestionAnswer() {
    //     var thisQuestionAnswer = Object.values(quizQuestions.correctAnswer)[questionNumber];
    //     return thisQuestionAnswer
    // }

    // Writes the initial selections to the page
    writeSelections();

    // Records a click on the selections
    $('#question-container').on('click', '.selection', showCorrectAnswer, function(thisQuestionAnswer){
        
        // Records the correct answer for the given question
        var thisQuestionAnswer = Object.values(quizQuestions.correctAnswer)[questionNumber];

        // Records the text from the selection clicked
        var selectedAnswer = $(this).text();

        // Checks to see if a selection has already been made. If a selection has been made, another selection cannot be selected until the next question is shown.
        if(clicked === false) {


            if(selectedAnswer === thisQuestionAnswer){
                // Add to correct and question number and adds green background if correct.
                clicked = true;
                correct++;
                questionNumber++;
                $(this).addClass('bg-success');

                // Stop interval, goes to next question, and resets interval
                stopInterval();
                questionChangeTimeout();

            } else {
                // Add to wrong and question number and adds red background if wrong.
                clicked = true;
                wrong++;
                
                $(this).addClass('bg-danger');
                
                // showCorrectAnswer();

                getSelections();
                for(i = 0; i < callSelections.length; i++){
                    if(thisQuestionAnswer === callSelections[i]){
                        $('.' + i).addClass('bg-success');
                    }
                }
                questionNumber++;

                // Stop interval, goes to next question, and resets interval
                stopInterval();
                questionChangeTimeout();
            }
        } else {
            return
        }
    })

    // Function to timeout going to the next question for 3 seconds
    function questionChangeTimeout() {
        setTimeout(function(){

            // Show final score page when all questions have been shown
            if(totalQuestions === questionNumber){
                var total = 100 * ((wrong + unanswered) / correct);
                $('#question-container').empty();
                $('#question-container').append('<li id="game-reset-screen"     class="list-group-item">Correct answers: ' +correct+ '<br>Wrong answers: ' +wrong+ '<br>Unanswered: ' +unanswered+ '<br>Total: ' +total+ '</li>')
                clearInterval();
                return
            }
            $('#question-container').empty()
            writeQuestion();
            writeSelections();
            intervalReset();
            clicked = false;
            writeQuestionNumber();
        }, 2000)
    }

    // Writes the current question number to the page
    function writeQuestionNumber() {
        $('#current-question').text(questionNumber + +1)
    }

    // Writes the initial question number to the page
    writeQuestionNumber();


    // Add green background to the correct answer
    /* NOT FUNCTIONAL */
    function showCorrectAnswer() {    
        getSelections();
        getQuestionAnswer()
        for(i = 0; i < callSelections.length; i++){
            if(thisQuestionAnswer === callSelections[i]){
                $('.' + i).addClass('bg-success');
            }
        }
    }

    $('.reset-button').click(function() {
        correct = 0;
        wrong = 0;
        unanswered = 0;
        questionNumber = 0;

        $('#question-container').empty()
        writeQuestion();
        writeSelections();
        intervalReset();
        clicked = false;
        writeQuestionNumber();
    })
























    // var selectedAnswer = [];

    // var delayAlert;

    

    // function writeQuestion() {
    //     $('#asked-question').text(quizQuestions[i].question)
    // };

    // function writeanswer() {
    //     for(i = 0; i < 4; i++){
    //         $('question' + i).html(quizQuestions[0].answer[i].a)
    //     }
    // };

    // var questionTimeout = setTimeout(function() {
    //     alert('Too slow! The answer was '/* + answer */)
    //     // Write next question
    // }, 5000);
    // // Working

    // var cancelQuestionTimeout = $('li').click(function() {
    //     clearTimeout(questionTimeout);
    // });
    // // Working
   
    
    // $('li').click(function(){
    //     $(this).addClass('active');
    //    var selection = $(this).html();
    //    selectedAnswer.push(selection);
    //    // Verify if selected answer is correct
       

    //    // Alert correct/incorrect and move to the next question
    //    log(selectedAnswer);
    // });

    // questionTimeout
    // cancelQuestionTimeout