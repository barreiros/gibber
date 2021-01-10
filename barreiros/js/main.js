import tools from './tools.js'
import vim from './vim.js'
import cue from './cue.js'

// TODO: Does not use intervals.
let gibberInterval = setInterval( ( ) => {

    if( Gibber.hasOwnProperty( 'Environment' ) ) {

        if( Gibber.Environment.hasOwnProperty( 'editor' ) && typeof( Gibber.Environment.editor ) !== 'undefined' ) {

            clearInterval( gibberInterval )

            cue( )

            vim( )

            window.Barreiros = tools

        }

    }

}, 1000 )

window.onbeforeunload = ( ) => {
    // return 'Reload???';
}
