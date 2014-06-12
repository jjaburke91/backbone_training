<script id="listing-template" type="text/x-handlebars-template">
    <div class="listing-article-container">
        <div id="article-{{this.objectID}}" data-id="{{this.objectID}}" class="listing-article-content">
            <div class="listing-article-title">
                {{this.title}}
            </div>

            <div class="listing-article-subtitle" >
                {{this.publishDate}}, {{this.byline}}
            </div>

            <div class="listing-article-socialMedia-container" >
                <a class="listing-article-socialMedia-link"href="http://www.linkedin.com/shareArticle?mini=true&url=${article.url}"><img src="https://cdn3.iconfinder.com/data/icons/picons-social/57/11-linkedin-32.png" alt="LinkedIn" /></a>
                <a class="listing-article-socialMedia-link" href="http://twitter.com/share?url=${article.url}&text=Check out this SCRIP article"><img src="https://cdn3.iconfinder.com/data/icons/picons-social/57/03-twitter-32.png" alt="Twitter" /></a>
                <a class="listing-article-socialMedia-link" href=""><img src="https://cdn3.iconfinder.com/data/icons/wpzoom-developer-icon-set/500/07-32.png" alt="Email" /></a>
                <a class="listing-article-socialMedia-link" href=""><img src="https://cdn3.iconfinder.com/data/icons/wpzoom-developer-icon-set/500/74-32.png" alt="Bookmark" /></a>
            </div>

            <div class="listing-article-body">
                {{{this.summary}}}
            </div>

        </div>
    </div>
</script>

<script id="top-level-nav-template" type="text/x-handlebars-template">
    <div class="{{style}}" style="font-size: 130%;border: 2px solid grey; text-align: center; cursor: pointer;">
        {{tag}}
    </div>
</script>