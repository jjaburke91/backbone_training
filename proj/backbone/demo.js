var tags = ["*"],
	page = 1,
	pageSize = 5,
	excludes = [],
	baseUrl = "http://localhost:8080/scrip/article-listings/get-tagged-articles-OR.json?";

// Store all the methods and attributes beloning to the listing components
var SCRIP_LISTING = {
    fetch_articles: function(listingCollection) {
        listingCollection.set({
            url: this.createQueryURL(tags,page,pageSize,excludes)
        });

        listingCollection.fetch( {
            success: function(collection) {
                collection.trigger("listing:fetched_and_modelled");
            },
            error: function(collection) {
                alert("Error in calling articles.");
            }
        })
    },

    createQueryURL: function createQueryURL(tags, page, pageSize, excludes) {
        var url = "tags="+tags + "&page="+page + "&pageSize="+pageSize + "&returnExtraRow=true&exclude="+excludes;
        console.log("Controller Query URL: " + baseUrl + url);
        return baseUrl + url;
    }

};

// Store the list types and their corresponding query settings here.
var SCRIP_LIST_TYPES = {
    latestNews: "",
    topStories: "Top Story"
};

// todo: Figure out best structure to manage tags and their sub-tags. burkej.
var SCRIP_AVAILABLE_TAGS = {
    topLevelTags: ["All", "Disease", "Product", "Industry"]
};


// ***** MODELS ***** _________________________________________________________________________________

// Article model
var Article = Backbone.Model.extend( {
	initialize: function() {
		console.log("An Article Model has been created.");
	}
});

var Query = Backbone.Model.extend( {
    initialize: function() {
        console.log("A Query Model has been created.");
    },
    defaults: {
        listType: SCRIP_LIST_TYPES.latestNews,
        topLevelTag: "*",
        lowLevelTags: []
    },

    changeListType: function(newListType) {
        listType = newListType;
    },
    changeTopLevelTag: function(newTopLevelTag) {
        topLevelTag = newTopLevelTag;
        lowLevelTags = [];
    },
    changeLowLevelTag: function(newLowLevelTag) {
        lowLevelTags = [newLowLevelTag];
    }
});

// ***** COLLECTIONS ***** _____________________________________________________________________________

var Listing = Backbone.Collection.extend({
	model: Article,
	url: SCRIP_LISTING.createQueryURL(tags, page, pageSize, excludes)

    /*
    success: function() {
        console.log("Article fetched successful.");
    },
    error: function() {
        console.log("** Article fetch failure. **");
    }
*/

});


// ***** VIEWS ******  _________________________________________________________________________________

// Listing View *****
var ListingView = Backbone.View.extend( {
	el: $("#listing-container"),
	tagName: 'div',
	listingTmpl: Handlebars.compile( $("#listing-template").html() ),

	initialize: function (options) {
        console.log("Initialising Listing View.");
        this.collection.on("listing:fetched_and_modelled", this.render, this);  // triggered when collection fetches articles and has modelled them all.
	},

	render: function() {
        // if DOM exists - updateDOM, else initDOM
        if (true) {
            return this.initDOM();
        } else {
            return this.updateDOM();
        }
    },

    initDOM: function() {
        console.log("Rendering Listing View.");
		var that = this;
		this.$el.html("");
		this.collection.forEach( function(model) {
			that.$el.append( that.listingTmpl( model.toJSON() ) );
		});
		return this;
	},

    updateDOM: function() {
        console.log("Appending Listing View.");
		var that = this;
		this.collection.forEach( function(model) {
			that.$el.append( that.listingTmpl( model.toJSON() ) );
		});
		return this;
    }
});


// Navigation Views
var TopLevelNav = Backbone.View.extend( {
    el: $("#top-level-nav"),
    tagName: 'div',
    topLevelNavTmpl: Handlebars.compile( $('#top-level-nav-template').html() ),
    model: Query,

    initialize: function() {
        console.log("Intialising TopLevelNav View.");
    },

    render: function() {
        var that = this,
            numTags = SCRIP_AVAILABLE_TAGS.topLevelTags.length;
        console.log("Rendering TopLevelNav View.");
        this.$el.html("");

        // Display available tags and highlight active.
        SCRIP_AVAILABLE_TAGS.topLevelTags.forEach( function(tagName) {
            var styleClass = "col-md-" + (12/numTags);
            that.$el.append( that.topLevelNavTmpl({
                tag: tagName,
                style: styleClass
            }));
        });

        // Modify Query model to desired state.
    }

});


// ***** initialisation *****  _________________________________________________________________________________
var query = new Query();

var topLevelNav = new TopLevelNav();
topLevelNav.render();

var listing = new Listing();
var listingView = new ListingView( {
    collection: listing
} );

SCRIP_LISTING.fetch_articles(listing);


