let vimMode = 'insert'

const sequences = [
    {
        codes: [ 74, 75 ],
        onMatch: ( editor, e ) => {

            if( vimMode === 'insert' ) {

                CodeMirror.Vim.exitInsertMode( editor )

            } else if( vimMode === 'visual' ) {

                CodeMirror.Vim.exitVisualMode( editor )

            }

        }
    },
    {
        codes: [ 67, 67 ],
        onMatch: ( editor, e ) => {

            console.log( 'Comento / Descomento la línea' )

        }
    }
]

const init = ( ) => {

    window.use( 'vim' )
    
    let vimInterval = setInterval( ( ) => {

        if( window.hasOwnProperty( 'CodeMirror' ) && window.CodeMirror.hasOwnProperty( 'Vim' ) ) {

            clearInterval( vimInterval )

            vimInitialized( )

        }

    }, 500 )

}

const vimInitialized = ( ) => {

    let editor = Gibber.Environment.editor

    extraMaps( ) // This method uses default vim codemirror flow.

    customMaps( ) // This method is my own maps complex sequences that I can't achieve with Codemirror flow.

    CodeMirror.on( editor, 'vim-mode-change', setVimMode )

    CodeMirror.Vim.defineEx( 'w', '', ( ) => { 

        Gibber.publish( 'save', editor.getValue( ) )

    } )

}

const customMaps = ( ) => {

    let lastKeyTime = 0

    let lastKeyIndex = 0

    let lastKeyMaps = [ ]

    let history = { }

    lastKeyMaps = sequences

    CodeMirror.on( Gibber.Environment.editor, 'keyup', ( editor, e ) => {

        let tempLastKeyMaps = [ ]

        for( let map of lastKeyMaps ) {

            if( map[ 'codes' ].length - 1 >= lastKeyIndex && map[ 'codes' ][ lastKeyIndex ] === e.keyCode ) {

                if( lastKeyIndex === 0 ) {
                    
                    history = editor.getHistory( )

                    setTimeout( ( ) => { 

                        lastKeyIndex = 0 

                        tempLastKeyMaps = [ ]

                    }, 200 )

                }

                if( map[ 'codes' ].length -1 === lastKeyIndex ) {

                    if( vimMode == 'insert' ) {

                        for( let codes of map[ 'codes' ] ) {

                            editor.triggerOnKeyDown( { type: 'keydown', keyCode: 8 } )

                        }

                        editor.setHistory( history )

                    }

                    map.onMatch( editor, e )

                } else {

                    tempLastKeyMaps.push( map )

                }

            }
            
        }

        if( tempLastKeyMaps.length ) {

            lastKeyMaps = tempLastKeyMaps

            lastKeyIndex += 1

        } else {

            lastKeyMaps = sequences

            lastKeyIndex = 0

        }

    } )

}

const extraMaps = ( ) => {

    CodeMirror.Vim.map( 'J', '}', 'normal' )
    CodeMirror.Vim.map( 'K', '{', 'normal' )
    CodeMirror.Vim.map( 'H', '0', 'normal' )
    CodeMirror.Vim.map( 'L', '$', 'normal' )
    CodeMirror.Vim.map( 'M', 'G', 'normal' )
    CodeMirror.Vim.map( 'U', 'gg', 'normal' )

    CodeMirror.Vim.map( 'J', '}', 'visual' )
    CodeMirror.Vim.map( 'K', '{', 'visual' )
    CodeMirror.Vim.map( 'H', '0', 'visual' )
    CodeMirror.Vim.map( 'L', '$', 'visual' )
    CodeMirror.Vim.map( 'M', 'G', 'visual' )
    CodeMirror.Vim.map( 'U', 'gg', 'visual' )

}

const setVimMode = ( data, e ) => {

    vimMode = data[ 'mode' ]

}

export default init
