import vim from './vim.js'

let gibberInterval = setInterval( ( ) => {

    if( Gibber.hasOwnProperty( 'Environment' ) ) {

        if( Gibber.Environment.hasOwnProperty( 'editor' ) && typeof( Gibber.Environment.editor ) !== 'undefined' ) {

            clearInterval( gibberInterval )

            Gibber.subscribe( 'save', ( ) => {

                console.log( 'Guardo el código' )

            } )

            vim( )
            // Gibber.subscribe( 'clear', ( ) => {
            //
            //     fetch( './resources/themes/ninetynine.png' )
            //         .then( data => data.text( ) )
            //         .then( text => {
            //             Environment.theme.load( text ) 
            //         } 
            //     )
            //
            // } )

        }

    }

}, 1000 )

window.onbeforeunload = ( ) => {
    // return 'Reload???';
}

let batch = ( object, action ) => {

    for( let value of object  ) {

        value[ action ]( )

    }

}
