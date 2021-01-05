import config from '../../lib/config';
import Helpers from '../../lib/Helpers';

export default class Products {

    /**
     * render - Display Products
     *
     */
    static render() {

        // Products route variables.
        var namespace = 'wp/v2';
        var route = '/products/(?P<id>)';

        // Register 'Products' route.
        config.wp.products = config.wp.registerRoute(namespace, route);

        // Loop through products.
        config.wp.products()
            .embed()
            .order('asc')
            .then( products => {
                Helpers.renderHeader( 'Products Page', 'h1' );
                console.log(products);
                let renderedProducts = products.map( content => {

                    // Product prices.
                    const productPrices = document.createElement('div');
                    productPrices.classList.add( 'wpd-pricing' );
                    productPrices.innerHTML = Helpers.decodeEntities( content.prices );

                    // Featured images.
                    const featuredImg = document.createElement('div');
                    featuredImg.classList.add( 'wpd-img' );
                    featuredImg.innerHTML = `<img class="feature" src="${content.featured_image_small}">`;
                    // Use demo image if none is found (@todo update API endpoint to do this automatically somehow)
                    if ( content.featured_image_small == null ) {
                        featuredImg.innerHTML = `<img class="feature no-img" src="https://demo.wpdispensary.com/wp-content/plugins/wp-dispensary/public/images/wpd-small.jpg" alt="Default image" />`;
                    }

                    // Article wrapper.
                    const articleEl = document.createElement( 'article' ),
                    titleEl = Helpers.getTitleMarkup( content, 'h2', true );

                    articleEl.classList.add( 'wpd-item' );

                    articleEl.appendChild( featuredImg );
                    articleEl.appendChild( titleEl );
                    articleEl.appendChild( productPrices );

                    config.articleContainer.appendChild( articleEl );

                    console.log( content );
                } );
            } )
            .catch( err => {
                console.log( 'Error: ' + err );
            } );

    }

}
