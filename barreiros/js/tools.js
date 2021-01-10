const batch = ( object, action ) => {

    for( let value of object  ) {

        value[ action ]( )

    }

}

export default {
    batch: batch
}
