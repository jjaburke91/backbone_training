// ***** MODELS *****

// Article model
var Article = Backbone.Model.extend( {
	intialize: function() {
		console.log("A new article has been created.");
	},
	
	defaults: {
		"id": 0,
		"title": "Article title",
		"summary": "This is the article summary."
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

for (var i=1; i <= 5; i++) {
	articles.addItem(i);
}


// Listing model
var Listing = Backbone.Model.extend({
	initialize: function() {
		console.log("A new listing model has been created.");
		this.on('change', function() {
			console.log("The listing has been updated:\n" + this.attributes.title);
		});
	},
	
	defaults: {
		title: "Listing model.",
		articles: [],
	},
	
	addArticle: function( article) {
		this.attributes.articles.push( article);
	}

} );

var listing = new Listing( {
	"articles": articles.items
});




// ***** VIEWS ******

var ListingView = Backbone.View.extend( {
	el: $("#article-listing"),
	tagName: 'div',
	listingTmpl: Handlebars.compile( $("#article-template").html() ),
	"model": listing,

	
	initialize: function (options) {
		this.options = options || {};
	},
	
	// Re-render the title of the todo item.
	render: function() {
		var articles = this.model.get("articles");
		var newHtml = "";
		for( var i=0; i < articles.length; i++) {
			newHtml += this.listingTmpl( articles[i].toJSON() );
		}
		this.$el.html( newHtml );
		
				
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

