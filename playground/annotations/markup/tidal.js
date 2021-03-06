const Utility = require( '../utilities.js' )
const $ = Utility.create

module.exports = function( Marker ) {
  // Marker.patternMarkupFunctions.tidal( tidalNode, state, tidalObj, container, seqNumber )

  const trimmers = [ 'string' ]
  const shouldTrim = type => trimmers.indexOf( type ) > -1

  const Tidal = function( node, state, tidal, container=null, index=0 ) {
    if( node.processed === true ) return 

    const cm       = state.cm,
          target   = tidal.target, // XXX seq.object for gibberwocky
          pattern  = tidal.__pattern.__data,
          markers  = {},
          line     = node.loc.start.line - 1 + node.offset.vertical,
          startCol = node.loc.start.column,
          endCol   = node.loc.end.column,
          startRow = line,
          endRow   = line + (node.loc.end.line - node.loc.start.line)

    const marker = cm.markText( 
      { line:startRow, ch:startCol }, 
      { line:endRow, ch:endCol }, 
      { className: 'annotation tidalblock' }
    )

    // this function recursively marks each number or string token in the pattern
    const markPattern = pattern => {
      if( pattern.type === 'repeat' ) {
        markPattern( pattern.value )
      }else if( pattern.values !== undefined ) {
        // recursively mark patterns
        pattern.values.forEach( markPattern )
      }else if( pattern.left !== undefined ) { // polymeter
        markPattern( pattern.left )
        markPattern( pattern.right )
      }else if( pattern.value !== undefined ) {
        let val = pattern.value //typeof pattern.value === 'string' ? pattern.value.trim() : pattern.value
        let uid = pattern.uid

        while( typeof val !== 'string' && typeof val !== 'number' && val !== undefined ) {
          const __store = val

          // get, for example, uids of values in repeat patterns
          uid = val.uid
          val = val.values || val.value
          
          if( val === undefined ) console.warn( 'tidal annotation leads to undefined:', __store )

          if( typeof val === 'function' ) {
            if( Array.isArray( __store ) ) {
              __store.forEach( markPattern )
              return
            }
          }
        }

        if( typeof val === 'string' ) val = val.trim()

        const loc = pattern.location
        if( shouldTrim( pattern.type ) ) {
          const len = typeof val === 'string' ? val.length : (''+val).length
          
          // check for whitespace and trim accordingly
          if( len < loc.end.column - loc.start.column ){
            loc.end.column = loc.start.column + len
          }
        }

        const className = `tidal-${tidal.uid}-${uid}`
        
        const lineModY = node.loc.start.line === node.loc.end.line ? -1 : 0
        const lineModX = node.loc.start.line === node.loc.end.line ? node.loc.start.column : -1

        const tokenStart = { line:line + loc.start.line + lineModY, ch:lineModX + loc.start.column }
        const tokenEnd   = { line:line + loc.end.line   + lineModY, ch:lineModX + loc.end.column } 

        const marker = cm.markText( 
          tokenStart, 
          tokenEnd,  
          { className: className+' cm-number tidal' } 
        )

        markers[ className ] = pattern
        
        pattern.cycle = Marker._createBorderCycleFunction( className, pattern )
        pattern.type = 'tidal'
        pattern.marker = marker
      }
    }

    const clearCycle = name => {
      if( markers[ name ] ) {
        let cycle = markers[ name ].cycle
        cycle.tm = setTimeout( function() {
          cycle.clear()
          $( '.' + name ).remove( 'tidal-bright' )
        }, 250 )
      }
    }

    tidal.update = function( val ) {
      const name = `tidal-${tidal.uid}-${tidal.update.uid}`

      $( '.' + name ).add( 'tidal-bright' ) 

      const cycle = markers[ name ].cycle

      if( cycle.tm !== undefined ) clearTimeout( cycle.tm )

      cycle() 
      clearCycle( name )
    }

    tidal.update.uid = pattern.uid

    markPattern( pattern )

    let value = null
    Object.defineProperty( tidal.update, 'value', {
      get() { return value },
      set(v){ 
        if( typeof v === 'string' ) v = v.trim()
        value = v
        tidal.update( value )
      }
    })

    tidal.update.clear = function() {
      clearCycle()
      for( let key in markers ) {
        markers[ key ].marker.clear()
      }
    }

  }

  return Tidal 
}
