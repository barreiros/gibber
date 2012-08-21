{"Seq":{"text":"<h1 id=\"seq\">Seq</h1>\n\n<p>Seq is used to sequence a variety of commands at specific durations. It can be used to call methods on objects, set properties of objects, or call named and anonymous functions.  </p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>a = Synth({maxVoices:5});\ns = Seq(['c4', 'd4', 'eb4', 'g4'], [_4, _16, _8]).slave(a);\nt = Seq(function() { s.note('c1'); }, _1);\nu = Seq({\n      chord:['c4m7', 'd4m7],\n      durations:_2,\n      slaves:a\n});</code></p>\n\n<h2 id=\"constructors\">Constructors</h2>\n\n<h3 id=\"syntax1\">syntax 1:</h3>\n\n<p><strong>param</strong> <strong>values</strong> : Array or function. The value(s) to be sequenced.  </p>\n\n<p><strong>param</strong> <strong>duration</strong> : Array or Gibber time value. The length for each value in the sequence. This can either be a single Gibber time value or an array of Gibber time values.  </p>\n\n<p>optional: {<strong>message</strong>} : String. A method to be called or a property for the Seq object to set</p>\n\n<hr />\n\n<h3 id=\"syntax2\">syntax 2:</h3>\n\n<p><strong>param</strong> <strong>arguments</strong> : Object. A dictionary of messages, durations and slaves to be sequenced. See example.</p>","methods":{"shuffle ":"<h3 id=\"seqshufflemethod\">Seq.shuffle : method</h3>\n\n<p><strong>param</strong> <em>sequenceName</em> : String. Default \"note\". The sequence values to shuffle. Choose \"all\" to shuffle all arrays in a sequence.</p>\n\n<p><strong>description</strong> : shuffle() randomizes the order of an array(s) in the Seq object. The order can be reset using the reset() method.</p>","reset ":"<h3 id=\"seqresetmethod\">Seq.reset : method</h3>\n\n<p><strong>param</strong> <em>memory location</em> Int. Optional. If a sequencer has retain a order, you can recall it by passing its number here. Otherwise the sequence is reset to its original order</p>\n\n<p><strong>description</strong> : reset order of sequence to its original order or to a memorized set of positions</p>","advance ":"<h3 id=\"seqadvancemethod\">Seq.advance : method</h3>\n\n<p><strong>description</strong> : Run the current event and schedule the next one. This is called automatically by the master clock if a sequencer is added to the Gibber.callback.slaves array.\nThis should never need to be explicitly called.</p>","once ":"<h3 id=\"seqoncemethod\">Seq.once : method</h3>\n\n<p><strong>param</strong> <em>sequenceName</em> : String. Default \"note\". The sequence that is played through to the end; all other sequences stop at the end of this one regardless of their length. </p>\n\n<p><strong>description</strong> : Play the sequence once and then end it</p>","random ":"<h3 id=\"seqrandommethod\">Seq.random : method</h3>\n\n<p><strong>description</strong> : Shuffle the sequence each time it is played. Currently only works on note sequence</p>","kill ":"<h3 id=\"seqkillmethod\">Seq.kill : method</h3>\n\n<p><strong>description</strong> : Destroy the sequencer</p>","slave ":"<h3 id=\"seqslavemethod\">Seq.slave : method</h3>\n\n<p><strong>param</strong> <em>slaves</em> Comma separated list of generators. The generators to be controlled by this sequencer  </p>\n\n<p><strong>description</strong> : This method tells the Seq object to send messages / set properties to the objects passed as parameters\nexample:\n<code>s = Synth();\nss = Synth();\nt = Seq([\"C4\", \"D4\"], _1);\nt.slave(s, ss);</code></p>","free ":"<h3 id=\"seqfreemethod\">Seq.free : method</h3>\n\n<p><strong>param</strong> <em>slave</em> : Optional generator. Free the passed generator. If no generator is passed, free all slaved generators</p>","stop ":"<h3 id=\"seqstopmethod\">Seq.stop : method</h3>\n\n<p><strong>description</strong> : stop the sequencer from running and reset the position counter to 0</p>","pause ":"<h3 id=\"seqpausemethod\">Seq.pause : method</h3>\n\n<p><strong>description</strong> : stop the sequencer from running but do not reset the current position</p>","repeat ":"<h3 id=\"seqrepeatmethod\">Seq.repeat : method</h3>\n\n<p><strong>param</strong> <em>timesToRepeat</em> : Integer. The number of times the sequence should repeat.</p>\n\n<p><strong>description</strong> : repeat the sequence a certain number of times and then stop it</p>","play ":"<h3 id=\"seqplaymethod\">Seq.play : method</h3>\n\n<p><strong>description</strong> : start the sequencer running</p>"},"properties":{"speed ":"<h3 id=\"seqspeedproperty\">Seq.speed : property</h3>\n\n<p>Integer. A single time value that determines how long each sequencer event lasts. This property only has an effect if the durations\nproperty of the sequencer object is null, otherwise the durations property takes priority.</p>","offset ":"<h3 id=\"seqoffsetproperty\">Seq.offset : property</h3>\n\n<p>Integer. An offset in samples for the scheduling of all events by the sequencer.</p>","durations ":"<h3 id=\"seqdurationsproperty\">Seq.durations : property</h3>\n\n<p>Array. The time values the sequencer uses to schedule events.</p>","humanize ":"<h3 id=\"seqhumanizeproperty\">Seq.humanize : property</h3>\n\n<p>Integer. Setting this to a non-null value will cause scheduling to be off by a random amount where in between -humanize and +humanize.\nFor example, <code>seq.humanize = 200;</code> would mean that scheduled values could be off by -200..200 samples. </p>"}},"Synth":{"text":"<h1 id=\"synth\">Synth</h1>\n\n<p>Create an oscillator(s) with an attached attack / decay envelope(s) that can play notes or chords.  </p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>s = Synth();\ns.note(\"A4\"); <br />\nt = Synth({ \n    maxVoices:5, \n    attack:_1,\n    decay:_1\n});\nt.chord(\"c4m7\");</code></p>\n\n<h2 id=\"constructors\">Constructors</h2>\n\n<h3 id=\"syntax1\">syntax 1:</h3>\n\n<p>param <strong>attack</strong>: Int in ms. The number of milliseconds the attack of the synth's envelope lasts <br />\nparam <strong>decay</strong> : Int in ms. The number of milliseconds the decay of the synth's envelope lasts <br />\nparam <strong>volume</strong> : Float. The volume of the synth.  </p>\n\n<hr />\n\n<h3 id=\"syntax2\">syntax 2:</h3>\n\n<p>param <strong>arguments</strong> : Object. A dictionary of property values to set upon initialization. See the properties section and the example usage section for details.</p>","methods":{"note ":"<h3 id=\"synthnotemethod\">Synth.note : method</h3>\n\n<p>param <strong>note or frequency</strong> : String or Integer. You can pass a note name, such as \"A#4\", or a frequency value, such as 440.\nparam <strong>amp</strong> : Optional. Float. The volume of the note, usually between 0..1. The main amp property of the Synth will also affect note amplitude.</p>\n\n<p>play a note and optionally specify and amplitude for it.</p>","chord ":"<h3 id=\"synthchordmethod\">Synth.chord : method</h3>\n\n<p>param <strong>chord name or note list</strong> : String or Array. You can pass a chord name, such as \"C4maj7\", or a list of notes, such as [\"A4\", \"C#4\", \"E4\"]\nparam <strong>amp</strong> : Optional. Float. The volume of the chord, usually between 0..1. The main amp property of the Synth will also affect chord amplitude.</p>\n\n<p>Play a chord and optionally specify and amplitude for it. This method only works if the maxVoices property is set to more than one voice in the constructor. See the example usage for details.</p>"},"properties":{"attack ":"<h3 id=\"synthattackproperty\">Synth.attack : property</h3>\n\n<p>Integer. The length, in samples, of the attack of the amplitude envelope.</p>","decay ":"<h3 id=\"synthdecayproperty\">Synth.decay : property</h3>\n\n<p>Integer. The length, in samples, of the decay of the amplitude envelope.</p>","amp ":"<h3 id=\"synthampproperty\">Synth.amp : property</h3>\n\n<p>Float. The peak amplitude of the synth, usually between 0..1</p>","maxVoices ":"<h3 id=\"synthmaxvoicesproperty\">Synth.maxVoices : property</h3>\n\n<p>Integer. The number of voices that can be played simultaneously by the synth. NOTE: This property only has effect when assigned in the constructor! See example.</p>","glide ":"<h3 id=\"synthglideproperty\">Synth.glide : property</h3>\n\n<p>Integer. The length in time, in samples, to slide in pitch from one note to the next.</p>"}},"Synth2":{"text":"<h1 id=\"synth2\">Synth2</h1>\n\n<p>Create an oscillator with an attached envelope and 24db resonant filter that can be triggered by note or chord messages. The envelope controls both the\namplitude and cutoff frequency of the filter.</p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>s = Synth2();\ns.note(\"A4\"); <br />\nt = Synth2({ \n    maxVoices:5,\n    cutoff:0,\n    filterMult:.5,\n    attack:_1,\n    decay:_1\n});\nt.chord(\"c4m7\");</code></p>\n\n<h2 id=\"constructors\">Constructors</h2>\n\n<h3 id=\"syntax1\">syntax 1:</h3>\n\n<p>param <strong>arguments</strong> : Object. A dictionary of property values to set upon initialization. See the properties section and the example usage section for details.</p>","methods":{"note ":"<h3 id=\"synth2notemethod\">Synth2.note : method</h3>\n\n<p>param <strong>note or frequency</strong> : String or Integer. You can pass a note name, such as \"A#4\", or a frequency value, such as 440.\nparam <strong>amp</strong> : Optional. Float. The volume of the note, usually between 0..1. The main amp property of the Synth will also affect note amplitude.</p>\n\n<p>play a note and optionally specify and amplitude for it.</p>","chord ":"<h3 id=\"synth2chordmethod\">Synth2.chord : method</h3>\n\n<p>param <strong>chord name or note list</strong> : String or Array. You can pass a chord name, such as \"C4maj7\", or a list of notes, such as [\"A4\", \"C#4\", \"E4\"]\nparam <strong>amp</strong> : Optional. Float. The volume of the chord, usually between 0..1. The main amp property of the Synth will also affect chord amplitude.</p>\n\n<p>Play a chord and optionally specify and amplitude for it. This method only works if the maxVoices property is set to more than one voice in the constructor. See the example usage for details.</p>"},"properties":{"attack ":"<h3 id=\"synth2attackproperty\">Synth2.attack : property</h3>\n\n<p>Integer. The length, in samples, of the attack of the amplitude envelope.</p>","decay ":"<h3 id=\"synth2decayproperty\">Synth2.decay : property</h3>\n\n<p>Integer. The length, in samples, of the decay of the amplitude envelope.</p>","amp ":"<h3 id=\"synth2ampproperty\">Synth2.amp : property</h3>\n\n<p>Float. The peak amplitude of the synth, usually between 0..1</p>","maxVoices ":"<h3 id=\"synth2maxvoicesproperty\">Synth2.maxVoices : property</h3>\n\n<p>Integer. The number of voices that can be played simultaneously by the synth. NOTE: This property only has effect when assigned in the constructor! See example.</p>","cutoff ":"<h3 id=\"synth2cutoffproperty\">Synth2.cutoff : property</h3>\n\n<p>Float. The frequency cutoff for the synth's filter. Range is 0..1.</p>","filterMult ":"<h3 id=\"synth2filtermultproperty\">Synth2.filterMult : property</h3>\n\n<p>Float. As the envelope on the synth progress, the filter cutoff will also change by this amount * the envelope amount.</p>","resonance ":"<h3 id=\"synth2resonanceproperty\">Synth2.resonance : property</h3>\n\n<p>Float. The emphasis placed on the filters cutoff frequency. 0..50, however, GOING OVER 5 IS DANGEROUS TO YOUR EARS (ok, maybe 6 is all right...)</p>","glide ":"<h3 id=\"synth2glideproperty\">Synth2.glide : property</h3>\n\n<p>Integer. The length in time, in samples, to slide in pitch from one note to the next.</p>"}},"Mono":{"text":"<h1 id=\"mono\">Mono</h1>\n\n<p>A three oscillator monosynth for bass and lead lines. You can set the octave and tuning offsets for oscillators 2 &amp; 3. There is a 24db filter and an envelope controlling\nboth the amplitude and filter cutoff.</p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>s = Mono();\ns.note(\"A4\"); <br />\nt = Mono({ \n    cutoff:0,\n    filterMult:.5,\n    attack:_8,\n    decay:_8,\n    octave2:-1,\n    octave3:-1,\n    detune2:.01,\n    glide:_12,\n});\nt.note(\"C3\");</code></p>\n\n<h2 id=\"constructors\">Constructors</h2>\n\n<h3 id=\"syntax1\">syntax 1:</h3>\n\n<p>param <strong>arguments</strong> : Object. A dictionary of property values to set upon initialization. See the properties section and the example usage section for details.</p>","methods":{"note ":"<h3 id=\"mononotemethod\">Mono.note : method</h3>\n\n<p>param <strong>note or frequency</strong> : String or Integer. You can pass a note name, such as \"A#4\", or a frequency value, such as 440.\nparam <strong>amp</strong> : Optional. Float. The volume of the note, usually between 0..1. The main amp property of the Synth will also affect note amplitude.</p>"},"properties":{"attack ":"<h3 id=\"monoattackproperty\">Mono.attack : property</h3>\n\n<p>Integer. The length, in samples, of the attack of the amplitude envelope.</p>","decay ":"<h3 id=\"monodecayproperty\">Mono.decay : property</h3>\n\n<p>Integer. The length, in samples, of the decay of the amplitude envelope.</p>","amp ":"<h3 id=\"monoampproperty\">Mono.amp : property</h3>\n\n<p>Float. The peak amplitude of the synth, usually between 0..1</p>","cutoff ":"<h3 id=\"monocutoffproperty\">Mono.cutoff : property</h3>\n\n<p>Float. The frequency cutoff for the synth's filter. Range is 0..1.</p>","filterMult ":"<h3 id=\"monofiltermultproperty\">Mono.filterMult : property</h3>\n\n<p>Float. As the envelope on the synth progress, the filter cutoff will also change by this amount * the envelope amount.</p>","resonance ":"<h3 id=\"monoresonanceproperty\">Mono.resonance : property</h3>\n\n<p>Float. The emphasis placed on the filters cutoff frequency. 0..50, however, GOING OVER 5 IS DANGEROUS TO YOUR EARS (ok, maybe 6 is all right...)</p>","octave2 ":"<h3 id=\"monooctave2property\">Mono.octave2 : property</h3>\n\n<p>Integer. The octave difference between oscillator 1 and oscillator 2. Can be positive (higher osc2) or negative (lower osc 2) or 0 (same octave).</p>","detune2 ":"<h3 id=\"monodetune2property\">Mono.detune2 : property</h3>\n\n<p>Float. The amount, from -1..1, the oscillator 2 is detuned. A value of -.5 means osc2 is half an octave lower than osc1. A value of .01 means osc2 is .01 octaves higher than osc1.</p>","octave3 ":"<h3 id=\"monooctave3property\">Mono.octave3 : property</h3>\n\n<p>Integer. The octave difference between oscillator 1 and oscillator 3. Can be positive (higher osc3) or negative (lower osc 3) or 0 (same octave).</p>","detune3 ":"<h3 id=\"monodetune3property\">Mono.detune3 : property</h3>\n\n<p>Float. The amount, from -1..1, the oscillator 3 is detuned. A value of -.5 means osc3 is half an octave lower than osc1. A value of .01 means osc3 is .01 octaves higher than osc1.</p>","glide ":"<h3 id=\"monoglideproperty\">Mono.glide : property</h3>\n\n<p>Integer. The length in time, in samples, to slide in pitch from one note to the next.</p>"}},"Arp":{"text":"<h1 id=\"arp\">Arp</h1>\n\n<p>The Arpeggiator takes a chord and plays the individual notes comprising it in succession, with different possible patterns.\nIt is basically an extended <a href=\"javascript:Gibber.Environment.displayDocs('Seq')\">Seq</a> object. The available patterns are:  </p>\n\n<ul>\n<li><em>up</em> : Play the notes in ascending order. After the top note, drop back to the bottom  </li>\n<li><em>down</em> : Play the notes in descending order. After the bottom note, jump to the top  </li>\n<li><em>updown</em> : Play the notes all the way up, and then play them all the way down. The top and bottom notes repeat when changing direction  </li>\n<li><em>updown2</em> : Play the notes all the way up, and then play them all the way down. The top and bottom notes DO NOT repeat when changing direction  </li>\n</ul>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>a = Sine();\nb = Arp('c2m7', _32, 'updown2', 4).slave(s);\n</code></p>\n\n<h2 id=\"constructor\">Constructor</h2>\n\n<p><strong>param</strong> <em>notation</em> : String. The chord to be sequenced. <br />\n  <strong>param</strong> <em>duration</em> : Integer. The duration for each note in the arpeggio. <br />\n  <strong>param</strong> <em>pattern</em> : String. Default: \"up\". The ordering for the arpeggio. <br />\n  <strong>param</strong> <em>mult</em> : Integer. How many octaves the arpeggio should span. The default is 1.</p>","methods":{"chord ":"<h3 id=\"arpchordmethod\">Arp.chord : method</h3>\n\n<p><strong>param</strong> <em>chord name</em> String. The chord to be sequenced.</p>\n\n<p><strong>description</strong> : Change the chord that the Arpeggiator is arpeggiating.</p>"},"properties":{}},"Drums":{"text":"<h1 id=\"drums\">Drums</h1>\n\n<p>Four different samplers linked to a single <a href=\"javascript:Gibber.Environment.displayDocs('Seq')\">Seq</a> for convenience. The four samplers feed into a single\n<a href=\"javascript:Gibber.Environment.displayDocs('Bus')\">Bus</a>; this means you can change the amplitude / apply\nfx to each sampler individually or make changes to the Bus. Similarly, you can change the pitch of individual samplers and for the Drums as a whole.</p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>d = Drums('x*o*x*o-', _8);\nd.amp = .4;\nd.snare.amp = 1.2;\nd.snare.fx.add( Delay(_16) );\nd.fx.add( Flanger() );\nd.shuffle(); // shuffle the underlying sequence</code></p>\n\n<h2 id=\"constructor\">Constructor</h2>\n\n<p><strong>param</strong> <em>sequence</em>: String. Uses x for kick, o for snare, * for closed hihat, - for open hihat\n<strong>param</strong> <em>timeValue</em>: Int. A duration in samples for each drum hit. Commonly uses Gibber time values such as _4, _8 etc. <br />\n<strong>param</strong> <em>amp</em>: Float. Default = .175. Volume for drums <br />\n<strong>param</strong> <em>freq</em>: Int. The audioLib.js samplers use 440 as a fundamental frequency. You can raise or lower the pitch of samples by changing this value.  </p>\n\n<p>example usage: <br />\n<code>d = Drums(\"x*o*x*o-\", _8);</code></p>\n\n<p>note that most Drum methods mirror that of Seq. </p>","methods":{"shuffle ":"<h3 id=\"drumsshufflemethod\">Drums.shuffle : method</h3>\n\n<p><strong>description</strong> : shuffle() randomizes the order of notes in the Drums object. The order can be reset using the reset() method.</p>","reset ":"<h3 id=\"drumsresetmethod\">Drums.reset : method</h3>\n\n<p><strong>param</strong> <em>memory location</em> Int. Optional. If Drums has retained an order, you can recall it by passing its number here. Otherwise the Drums sequence is reset to its original order</p>\n\n<p><strong>description</strong> : reset order of Drumssequence to its original order or to a memorized set of positions</p>","stop ":"<h3 id=\"drumsstopmethod\">Drums.stop : method</h3>\n\n<p><strong>description</strong> : stop the Drums sequencer from running and reset the position counter to 0</p>","play ":"<h3 id=\"drumsplaymethod\">Drums.play : method</h3>\n\n<p><strong>description</strong> : start the Drums sequencer running</p>","kill ":"<h3 id=\"drumskillmethod\">Drums.kill : method</h3>\n\n<p><strong>description</strong> : Remove a Drums instance from the audio graph</p>","once ":"<h3 id=\"drumsoncemethod\">Drums.once : method</h3>\n\n<p><strong>description</strong> : Play the Drums sequence once and then stop.</p>","note ":"<h3 id=\"drumsnotemethod\">Drums.note : method</h3>\n\n<p><strong>param</strong> <em>note</em> : String. The note you want the drum to play. Can be x, o, *, -. <br />\n<strong>description</strong> : shuffle() randomizes the order of notes in the Drums object. The order can be reset using the reset() method.</p>"},"properties":{"pitch ":"<h3 id=\"drumspitchproperty\">Drums.pitch : property</h3>\n\n<p>Float. The overall pitch of the Drums. Each specific drum can also have its pitch set.</p>","kick ":"<h3 id=\"drumskickproperty\">Drums.kick : property</h3>\n\n<p><a href=\"javascript:Gibber.Environment.displayDocs('Sampler')\">Sampler</a> (read-only).</p>","snare ":"<h3 id=\"drumssnareproperty\">Drums.snare : property</h3>\n\n<p><a href=\"javascript:Gibber.Environment.displayDocs('Sampler')\">Sampler</a> (read-only).</p>","hat ":"<h3 id=\"drumshatproperty\">Drums.hat : property</h3>\n\n<p><a href=\"javascript:Gibber.Environment.displayDocs('Sampler')\">Sampler</a> (read-only).</p>","openHat ":"<h3 id=\"drumsopenhatproperty\">Drums.openHat : property</h3>\n\n<p><a href=\"javascript:Gibber.Environment.displayDocs('Sampler')\">Sampler</a> (read-only).</p>","seq ":"<h3 id=\"drumsseqproperty\">Drums.seq : property</h3>\n\n<p><a href=\"javascript:Gibber.Environment.displayDocs('Seq')\">Seq</a> (read-only). The underlying sequencer driving the drums. Most methods of this are wrapped,\nfor example, you can simply call <code>drums.play()</code> instead of having to call <code>drums.seq.play</code>.</p>","amp ":"<h3 id=\"drumsampproperty\">Drums.amp : property</h3>\n\n<p>Float. The overall amplitude of the Drums. Each specific drum can also have its amplitude set.</p>"}},"Bus":{"text":"<h1 id=\"bus\">Bus</h1>\n\n<p><strong>description</strong> : Create a bus holding fx that signals can be routed to \n<em>param</em> <em>name</em>: String Optional name that can be used to refer to the new bus. <br />\n<em>param</em> <em>fx</em>: variable length object list. A comma delimited list of effects to attach to the bus.  </p>\n\n<h2 id=\"exampleusage\">Example Usage##</h2>\n\n<p><code>b = Bus( Delay(_4), Reverb() ); <br />\n s = Synth(); <br />\ns.send( b, .5 ); \nalternatively: <br />\n</code>b = Bus( \"rev\", Delay(_4), Reverb() ); <br />\n s = Synth(); <br />\ns.send( \"rev\", .5 );`</p>","methods":{},"properties":{}},"Flanger":{"text":"<h1 id=\"flanger\">Flanger</h1>\n\n<p><strong>description</strong> : A traditional flanger using a variable-length comb filter.</p>\n\n<p><strong>param</strong> <em>rate</em>: Float. Default = .25. Measured in Hz, this is the speed that the delay line size fluctuates at <br />\n<strong>param</strong> <em>amount</em>: Int. Default = 125. The amount that the size of the delay line fluctuates by <br />\n<strong>param</strong> <em>feedback</em>: Float. Default = .25. Feedback for the flanger. Increase to get a more pronounced effect <br />\n<strong>param</strong> <em>offset</em>: Int. Default = amount. The offset of the flanger's comb filter from the current sample. By default this is the same as the amount parameter  </p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>p = Pluck(0, 1); <br />\np.fx.add( Flanger() ); <br />\np.note( \"A3\" );</code></p>","methods":{},"properties":{"rate ":"<h3 id=\"flangerrateproperty\">Flanger.rate : property</h3>\n\n<p>Float. Hz. the speed that the delay line size fluctuates at.</p>","amount ":"<h3 id=\"flangeramountproperty\">Flanger.amount : property</h3>\n\n<p>Float. Hz. The amount that the size of the delay line fluctuates by.</p>"}},"Chorus":{"text":"<h1 id=\"chorus\">Chorus</h1>\n\n<p><strong>description</strong> : cheap chorus using a flanger with an extreme offset see http://denniscronin.net/dsp/article.html</p>\n\n<p><strong>param</strong> <em>rate</em>: Float. Default = .25. Measure in Hz, this is the speed that the delay line size fluctuates at <br />\n<strong>param</strong> <em>amount</em>: Int. Default = 125. The amount that the size of the delay line fluctuates by </p>","methods":{},"properties":{"rate ":"<h3 id=\"chorusrateproperty\">Chorus.rate : property</h3>\n\n<p>Float. Hz. The speed that the delay line size fluctuates at.</p>","amount ":"<h3 id=\"chorusamountproperty\">Chorus.amount : property</h3>\n\n<p>Float. Hz. The amount that the size of the delay line fluctuates by.</p>"}},"Reverb":{"text":"<h1 id=\"reverb\">Reverb</h1>\n\n<p><strong>description</strong> :  based off audiolib.js reverb and freeverb</p>\n\n<p><strong>param</strong> <em>roomSize</em>: Float. Default = .8. The size of the room being emulated <br />\n<strong>param</strong> <em>damping</em>: Float. Default = .3. Attenuation of high frequencies that occurs <br />\n<strong>param</strong> <em>wet</em>: Float. Default = .75. The amount of processed signal that is output <br />\n<strong>param</strong> <em>dry</em>: Float. Default = .5. The amount of dry signal that is output  </p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>s = Synth(); <br />\ns.fx.add( Reverb() );</code></p>","methods":{},"properties":{"roomSize ":"<h3 id=\"reverbroomsizeproperty\">Reverb.roomSize : property</h3>\n\n<p>Float. Default = .5. The amount of dry signal that is output</p>","damping ":"<h3 id=\"reverbdampingproperty\">Reverb.damping : property</h3>\n\n<p>Float. Attenuation of high frequencies that occurs.</p>","wet ":"<h3 id=\"reverbwetproperty\">Reverb.wet : property</h3>\n\n<p>Float. Default = .75. The amount of processed signal that is output.  </p>"}},"Delay":{"text":"<h1 id=\"delay\">Delay</h1>\n\n<p><strong>param</strong> <em>time</em>: Int. Default = _4. The number of samples betweeen echoes, usually expressed in Gibber time variables\n<strong>param</strong> <em>feedback</em>: Float. Default = .3. How much of the output is fed back into the input of hte delay  </p>\n\n<h2 id=\"exampleusage\">Example Usage##</h2>\n\n<p><code>s = Synth(); <br />\ns.fx.add( Delay() );</code>\n/**###Delay.time : property\nInt. The number of samples betweeen echoes, usually expressed in Gibber time variables</p>","methods":{},"properties":{"feedback ":"<h3 id=\"delayfeedbackproperty\">Delay.feedback : property</h3>\n\n<p>Float. The amplitude of the sine wave the signal is multiplied by  </p>"}},"Ring":{"text":"<h1 id=\"ring\">Ring</h1>\n\n<p><strong>param</strong> <em>frequency</em>: Float. Default = 440. The frequency of the sine wave that the signal is multiplied by <br />\n<strong>param</strong> <em>amount</em>: Float. Default = 1. The amplitude of the sine wave the signal is multiplied by  </p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>s = Synth(); <br />\ns.fx.add( Ring(220, .5) );</code></p>\n\n<p>/**###Ring.frequency : property\nFloat. The frequency of the sine wave that the signal is multiplied by  </p>","methods":{},"properties":{}},"Crush":{"text":"<h1 id=\"crush\">Crush</h1>\n\n<p><strong>description</strong> : A bit-crusher / sample-rate reducer\n<strong>param</strong> <em>bitDepth</em>: Float. Default = 8. The number of bits to truncate the output to.\n<strong>param</strong> <em>sampleRate</em>: Float. Default = 1. The sampleRate to downsample to. Range is 0..1\nexample usage: <br />\n<code>d = Drums(\"xoxo\"); <br />\nd.fx.add( Crush(6, .05) );</code></p>","methods":{},"properties":{"bitDepth ":"<h3 id=\"crushbitdepthproperty\">Crush.bitDepth : property</h3>\n\n<p>Float. The number of bits to truncate the output to.</p>","sampleRate ":"<h3 id=\"crushsamplerateproperty\">Crush.sampleRate : property</h3>\n\n<p>Float. The sampleRate to downsample to. Range is 0..1</p>"}},"Clip":{"text":"<h1 id=\"clip\">Clip</h1>\n\n<p><strong>description</strong> : A simple waveshaping distortion using y = x / (1+|x|). Clip also has a logarithmic volume adapter to the equation so that you can\napply extreme amounts of clipping</p>\n\n<p><strong>param</strong> <em>amount</em>: Float. Default = 4. Minimum of 2. The amount of distortion\n<strong>param</strong> <em>amp</em>: Float. Default = 1. The amount of distortion</p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>d = Drums(\"xoxo\"); <br />\nd.fx.add( Clip(1000) );</code></p>","methods":{},"properties":{"amount ":"<h3 id=\"clipamountproperty\">Clip.amount : property</h3>\n\n<p>Float. The number of bits to truncate the output to.</p>","amp ":"<h3 id=\"clipampproperty\">Clip.amp : property</h3>\n\n<p>Float. The sampleRate to downsample to. Range is 0..1</p>"}},"LPF":{"text":"<h1 id=\"lpf\">LPF</h1>\n\n<p><strong>description</strong> : 24db resonant ladder-style filter</p>\n\n<p><strong>param</strong> <em>cutoff</em>: Float. Default = .1. The cutoff frequency of the filter. Range is 0..1\n<strong>param</strong> <em>resonance</em>: Float. Default = 3. Emphasis of the cutoff frequency. Range is 0..50. Higher than 6 is scary.</p>\n\n<h2 id=\"exampleusage\">Example Usage##</h2>\n\n<p><code>d = Drums(\"xoxo\");\nd.amp = 3.5; <br />\nl = LPF(.2, 40); <br />\nd.fx.add( Crush(4,.1),  l, Clip(2, .25), Reverb() ); <br />\ns = Seq( function() { l.cutoff = rndf(0,.25);}, _8); <br />\nMaster.fx.add( Flanger() );</code></p>","methods":{},"properties":{"cutoff ":"<h3 id=\"lpfcutoffproperty\">LPF.cutoff : property</h3>\n\n<p>Float. The cutoff frequency of the filter. Range is 0..1</p>","resonance ":"<h3 id=\"lpfresonanceproperty\">LPF.resonance : property</h3>\n\n<p>Float. Emphasis of the cutoff frequency. Range is 0..50. Higher than 6 is scary. See example for higher than 6.</p>"}},"HPF":{"text":"<h1 id=\"hpf\">HPF</h1>\n\n<p><strong>description</strong> : 24db resonant ladder-style filter</p>\n\n<p><strong>param</strong> <em>cutoff</em>: Float. Default = .1. The cutoff frequency of the filter. Range is 0..1\n<strong>param</strong> <em>resonance</em>: Float. Default = 3. Emphasis of the cutoff frequency. Range is 0..50. Higher than 6 is scary.</p>\n\n<h2 id=\"exampleusage\">Example Usage##</h2>\n\n<p><code>d = Drums(\"xoxo\");\nd.amp = 3.5; <br />\nl = HPF(.2, 40); <br />\nd.fx.add( Crush(4,.1),  l, Clip(2, .25), Reverb() ); <br />\ns = Seq( function() { l.cutoff = rndf(0,.25);}, _8); <br />\nMaster.fx.add( Flanger() );</code></p>","methods":{},"properties":{"cutoff ":"<h3 id=\"hpfcutoffproperty\">HPF.cutoff : property</h3>\n\n<p>Float. The cutoff frequency of the filter. Range is 0..1</p>","resonance ":"<h3 id=\"hpfresonanceproperty\">HPF.resonance : property</h3>\n\n<p>Float. Emphasis of the cutoff frequency. Range is 0..50. Higher than 6 is scary. See example for higher than 6.</p>"}},"Gain":{"text":"<h1 id=\"gain\">Gain</h1>\n\n<p><strong>description</strong> : a simple gain controller, can be used to scale output for example after high amplitude distortions or resonant filters.  </p>\n\n<p><strong>param</strong> <em>gain</em>: Float. Default = 1. A multiple for the amplitude.</p>","methods":{},"properties":{"gain ":"<h3 id=\"gaingainproperty\">Gain.gain : property</h3>\n\n<p>Float. A multiple for the amplitude.</p>"}},"Grains":{"text":"<h1 id=\"grains\">Grains</h1>\n\n<p>A granulator that operates on a buffer of samples. You can either get the samples from a <a href=\"javascript:Gibber.Environment.displayDocs('Sampler')\">Sampler</a>\nobject, or the output of a <a href=\"javascript:Gibber.Environment.displayDocs('Bus')\">Bus</a> (like the Master bus) \nusing the <a href=\"javascript:Gibber.Environment.displayDocs('Record')\">Record</a> object.</p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>d = Drums('x*o*x*o-', _8);\nr = Record(d, _1 * 4);\nr.startRecording(); <br />\n// wait 4 or 5 measures <br />\ng = Grains({buffer:r.buffer, amp:.8});\ng.loop(.2, .8, _1 * 16);\ng.mod(\"speedMax\", Line(.1,.8, _1 * 16, true), \"=\");\ng.mod(\"speedMin\", Line(-.1,-.8, _1 * 16, true), \"=\"); <br />\nd.stop();</code></p>\n\n<h2 id=\"constructor\">Constructor</h2>\n\n<p><strong>param</strong> <em>propertiesList</em>: Object. At a minimum you should define the buffer to granulate. See the example.</p>","methods":{"loop ":"<h3 id=\"grainsloopmethod\">Grains.loop : method</h3>\n\n<p><strong>param</strong> <em>min</em> Float. Default .25. The starting position for the playback loop. Measured from 0..1 where is the buffer start, 1 is the buffer end. <br />\n<strong>param</strong> <em>max</em> Float. Default .75.The finishing position for the playback loop. Measured from 0..1 where is the buffer start, 1 is the buffer end. <br />\n<strong>param</strong> <em>time</em> Int. Default _1. The length of time, in samples, to travel through the loop points once. <br />\n<strong>shouldLoop</strong> <em>Boolean</em>. Default true. If set to false, the buffer will only play through the min and max values once.  </p>\n\n<p><strong>description</strong> : Tell the Grain cloud to travel between two positions in its buffer.</p>"},"properties":{"grainSize ":"<h3 id=\"grainsgrainsizeproperty\">Grains.grainSize : property</h3>\n\n<p>Integer. The length, in samples, of each grain</p>","speed ":"<h3 id=\"grainsspeedproperty\">Grains.speed : property</h3>\n\n<p>Float. The playback rate, in samples, of each grain</p>","speedMin ":"<h3 id=\"grainsspeedminproperty\">Grains.speedMin : property</h3>\n\n<p>Float. When set, the playback rate will vary on a per grain basis from (grain.speed + grain.speedMin) -> (grain.speed + grain.speedMax). This value should almost always be negative.</p>","speedMMax ":"<h3 id=\"grainsspeedmmaxproperty\">Grains.speedMMax : property</h3>\n\n<p>Float. When set, the playback rate will vary on a per grain basis from (grain.speed + grain.speedMin) -> (grain.speed + grain.speedMax).</p>","position ":"<h3 id=\"grainspositionproperty\">Grains.position : property</h3>\n\n<p>Float. The center position of the grain cloud. 0 represents the start of the buffer, 1 represents the end.</p>","positionMin ":"<h3 id=\"grainspositionminproperty\">Grains.positionMin : property</h3>\n\n<p>Float. The left boundary on the time axis of the grain cloud.</p>","positionMax ":"<h3 id=\"grainspositionmaxproperty\">Grains.positionMax : property</h3>\n\n<p>Float. The right boundary on the time axis of the grain cloud.</p>","numberOfGrains ":"<h3 id=\"grainsnumberofgrainsproperty\">Grains.numberOfGrains : property</h3>\n\n<p>Float. The number of grains in the cloud. Can currently only be set on initialization.</p>"}},"Record":{"text":"<h1 id=\"record\">Record</h1>\n\n<p>Record allows you to sample the output of any bus. This could be the Master bus, or any of the polyphonic instruments that output to their own dedicated bus:\n+ <a href=\"javascript:Gibber.Environment.displayDocs('Synth')\">Synth</a>\n+ <a href=\"javascript:Gibber.Environment.displayDocs('Synth2')\">Synth</a>\n+ <a href=\"javascript:Gibber.Environment.displayDocs('FMSynth')\">FMSynth</a>\n+ <a href=\"javascript:Gibber.Environment.displayDocs('Pluck')\">Pluck</a>\n+ <a href=\"javascript:Gibber.Environment.displayDocs('Drums')\">Drums</a></p>\n\n<p><a href=\"javascript:Gibber.Environment.displayDocs('Sampler')\">Sampler</a>\nobject, or the output of a <a href=\"javascript:Gibber.Environment.displayDocs('Bus')\">Bus</a> (like the Master bus) \nusing the <a href=\"javascript:Gibber.Environment.displayDocs('Record')\">Record</a> object.</p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>d = Drums('x*o*x*o-', _8);\nr = Record(d, _1 * 4);\nr.startRecording(); <br />\n// wait 4 or 5 measures <br />\ng = Grains({buffer:r.buffer, amp:.8});\ng.loop(.2, .8, _1 * 16);\ng.mod(\"speedMax\", Line(.1,.8, _1 * 16, true), \"=\");\ng.mod(\"speedMin\", Line(-.1,-.8, _1 * 16, true), \"=\"); <br />\nd.stop();</code></p>\n\n<h2 id=\"constructor\">Constructor</h2>\n\n<p><strong>param</strong> <em>propertiesList</em>: Object. At a minimum you should define the buffer to granulate. See the example.</p>","methods":{},"properties":{}}}