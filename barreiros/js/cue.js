import './vendor/localforage.js'

let db

const init = ( ) => {

    db = localforage.createInstance( {
        name: 'gibber',
        storeName: 'cue'
    } )

    setInitialPoint( )

    Gibber.subscribe( 'save', setPoint )

}

const setInitialPoint = ( ) => {

    let editor = Gibber.Environment.editor

    db.getItem( 'code', ( err, data ) => {

        if( data ) {

            editor.setValue( data )

        }

    } )

}

const setPoint = ( data ) => {

    db.clear( ).then( ( ) => {

        db.setItem( 'code', data )

    } )

}

export const set = setPoint

export default init 
