document.addEventListener( 'DOMContentLoaded', ( ) => {

    document.getElementById( 'editor' ).addEventListener( 'click', ( e ) => {

        let lastKeyTime = 0

        let lastKeyIndex = 0

        let lastKeyMaps = [ ]

        let vimMode = 0

        vimMode = 'insert' 

        window.use( 'vim' )

        setTimeout( ( ) => {

            // Mapeo algunas keys.
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

            // Creo una función propia para gestionar algunos mapeos que no quedan bien usando el API nativa de CodeMirror.
            customMaps = [
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

            lastKeyMaps = customMaps

            CodeMirror.on( Gibber.Environment.editor, 'keyup', ( editor, e ) => {

                let tempLastKeyMaps = [ ]

                for( let map of lastKeyMaps ) {

                    if( map[ 'codes' ].length - 1 >= lastKeyIndex && map[ 'codes' ][ lastKeyIndex ] === e.keyCode ) {

                        if( lastKeyIndex === 0 ) {
                            
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

                    lastKeyMaps = customMaps

                    lastKeyIndex = 0

                }

            } )

            CodeMirror.Vim.defineEx( 'w', '', ( ) => { 
                console.log( 'heyyyyyyyyy' ) 
            } )

            Gibber.subscribe( 'clear', ( ) => {

                fetch( './resources/themes/ninetynine.png' )
                    .then( data => data.text( ) )
                    .then( text => {
                        Environment.theme.load( text ) 
                    } 
                )

            } )

            CodeMirror.on( Gibber.Environment.editor, 'vim-mode-change', ( data, e ) => {

                vimMode = data[ 'mode' ]

            } )

        }, 1000 )

    } );

} )

let batch = ( object, action ) => {

    for( let value of object  ) {

        value[ action ]( )

    }

}
