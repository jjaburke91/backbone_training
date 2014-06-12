// ***** MODELS *****

// Article model
var Article = Backbone.Model.extend( {
	intialize: function() {
		console.log("A new article has been created.");
	},
	
	defaults: {
		"id": 0,
		"title": "Default Article title",
		"summary": "This is the article summary. This is the article summary. This is the article summary. This is the article summary."
	}
});
var articles = {
	items: [],
	addItem: function(i) {
		this.items.push( new Article( {
			"id": i
		}));
	}
}	
for (var i=1; i <= 5; i++) { articles.addItem(i); }


// Listing model
var Listing = Backbone.Collection.extend({
	model: Article
} );
var listing = new Listing(articles.items);



// ***** VIEWS ******

var ListingView = Backbone.View.extend( {
	el: $("#article-listing"),
	tagName: 'div',
	listingTmpl: Handlebars.compile( $("#article-template").html() ),
	collection: listing,
	
	initialize: function (options) {
		this.options = options || {};
		this.render();
	},
	
	render: function() {
		var that = this;
		
		this.collection.forEach( function(model) {
			that.$el.append( that.listingTmpl( model.toJSON() ) );
		});
					
		return this;
	}

});
var listingView = new ListingView();


// NON BACKBONE

var LISTING_NAVIGATION = {
    listingType : "Latest News",
    highLevelTag : "*",
    lowLevelTags : [],

    addLowLevelTag : function( newLowLevelTag) {
        this.lowLevelTags.push( newLowLevelTag);
    },
    removeLowLevelTag : function( tagToRemove) {
        var item = this.lowLevelTags.indexOf( tagToRemove);
        this.lowLevelTags.splice(item, 1);
    },

    replaceHighLevelTag : function ( newHighLevelTag) {
        if ( newHighLevelTag === "All") {
            newHighLevelTag = "*";
        }
        this.highLevelTag = newHighLevelTag;
    },

    resetListing : function() {
        this.listingType = "Latest News";
        this.highLevelTag = "*";
        this.lowLevelTags = [];
    }
};

