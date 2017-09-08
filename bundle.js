(function() {

    // Custom functions and helpers
    // jQuery is available under $ var
    // Other libraries can be loaded on top of template html

    function reset() {}

    function clean(task) {}

    function init() {}

    // First step under the hood
    pybossa.taskLoaded(function(task, deferred) {

        // Check if there is a task available for current user
        if (!$.isEmptyObject(task)) {

            // Run here data cleaning, preparation or enhancement, also asynchronous
            clean(task);

            // Run presentTask
            deferred.resolve(task);

        } else {

            deferred.resolve(task);

        }

    });

    // Second step present the current task to the user
    pybossa.presentTask(function(task, deferred) {

        // Check if there is a task available for current user
        if (!$.isEmptyObject(task)) {

            $(".skeleton").show();

            // Load the task data into the HTML DOM
            init()

            // Save an object based on task and data provided by the user
            // when an event occurs (ie. click on submit button)
            $("#submit-button").off('click').on('click', function(e) {

                pybossa.saveTask(task.id, {}).done(function(data) {

                    // Show the feedback div
                    pybossaNotify("Answer saved, thanks!", true, "info");

                    // Reset here UI elements if needed and load next task
                    // Remember: page not refreshes, next task loading is asynchronous
                    reset();

                    // Load next task
                    deferred.resolve();

                });

            });

            // Load next task without saving on click on skip button
            $("#skip-button").off('click').on('click', function(e) {

                reset();

                deferred.resolve();

            });

        } else {

            $(".skeleton").hide();

            pybossaNotify("Thanks! You have participated in all available tasks. Enjoy some of your time!", true, "info");

        }
    });

    // Run tasks
    pybossa.run('my-project');

})();
