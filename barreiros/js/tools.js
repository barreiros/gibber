import samples from './samples.js'

const batch = ( object, action ) => {

    for( let value of object  ) {

        value[ action ]( )

    }

}

const sample = ( name, index = 1 ) => {

    let audioFile

    index -= 1

    if( ! samples.hasOwnProperty( name ) ) {

        name = Object.keys( samples )[ 0 ]

        index = 0

    }

    // Si el índice es mayor le paso el número correspondiente simulando un loop en el que el último número de la lista + 1 es el primero de la misma lista. Esto está copiado de TidalCycles.
    if( index >= samples[ name ].length ) {

        index = Math.round( index % samples[ name ].length )

    }

    audioFile = name + '/' + samples[ name ][ index ]

    if( ! audioFile.includes( '.' ) ) {
        
        audioFile = audioFile + '.WAV'

    }

    console.log( index )
    
    console.log( audioFile )

    return '/barreiros/samples/' + audioFile

}

export default {
    batch: batch,
    sample: sample
}
