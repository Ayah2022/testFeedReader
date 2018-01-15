/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS feeds definitions,
	the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         allFeeds variable has been defined and it is not
         empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* a test loops through each feed in the allFeeds object and ensures it has a URL defined
         and the URL is not empty.
         */
        it('URL is defined and is not empty', function() {
            allFeeds.forEach(function(feed) {
                let feedURL = feed.url;
                expect(feedURL).toBeDefined();
                expect(feedURL.length).not.toBe(0);
            });
        });


        /* a test loops through each feed in the allFeeds object and ensures it has a name defined
         and the name is not empty.
         */
        it('Name is defined and is not empty', function() {
            allFeeds.forEach(function(feed) {
                feedName = feed.name;
                expect(feedName).toBeDefined();
                expect(feedName.length).not.toBe(0);
            });
        });
    });


    /*a new test suite named "The menu" */
    describe('Menu', function() {
        /*a test  ensures the menu element is hidden by default. 
         */
        it('Hidden Menu', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


        /*a test ensures the menu changes visibility when the menu icon is clicked. This test
         have two expectations: does the menu display when
         clicked and does it hide when clicked again.
         */

        it('menu visibility', function() {
            $('a.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toEqual(false);
       
            $('a.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
    });
    /*a test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        //run before test
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* a test ensures when the loadFeed function is called and completes its work, there is at least
          a single .entry element within the .feed container.
         */

        it('Entry element is there', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });


    /* a test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var newFeed;
        /*a test  ensures when a new feed is loaded by the loadFeed function that the content actually changes.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                newFeed = $('.feed').html();
                loadFeed(1, done);
            });
        });
        it('Has been loaded', function() {
            expect($('.feed').html()).not.toEqual(newFeed);
        });
    });

}());