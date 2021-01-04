import config from '../../lib/config';
import Helpers from '../../lib/Helpers';

export default class Products {

    /**
     * render - Display Products
     *
     */
    static render() {

        var namespace = 'wp/v2'; // use the WP API namespace
        var route = '/products/(?P<id>)'; // route string - allows optional ID parameter

        // Register 'Products' route.
        config.wp.products = config.wp.registerRoute(namespace, route);

        config.wp.products()
            .embed()
            .then( products => {
                Helpers.renderHeader( 'Products Page', 'h1' );
                console.log(products);
                let renderedProducts = products.map( content => {

                    const featuredImg = document.createElement('div'); // is a node
                    featuredImg.innerHTML = `<img class="feature" src="${content.featured_image_small}">`;
                    featuredImg.classList.add( 'wpd-img' );

                    const articleEl = document.createElement( 'article' ),
                    titleEl = Helpers.getTitleMarkup( content, 'h2', true );
      
                    articleEl.classList.add( 'wpd-item' );
                    articleEl.appendChild( titleEl );
                    articleEl.appendChild( featuredImg );

                    config.articleContainer.appendChild( articleEl );

                    console.log( content );
                } );
            } )
            .catch( err => {
                console.log( 'Error: ' + err );
            } );

    }

}
