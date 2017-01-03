import * as browserbunyan from 'browser-bunyan';
// var browserbunyan = require('browser-bunyan');

var ringBufferOptions:browserbunyan.RingBufferOptions = {
    limit: 100
};
var ringBuffer:browserbunyan.RingBuffer = new browserbunyan.RingBuffer(ringBufferOptions);
ringBuffer.write("hello");
ringBuffer.end();
ringBuffer.destroy();
ringBuffer.destroySoon();

var level:number;
level = browserbunyan.resolveLevel("trace");
level = browserbunyan.resolveLevel("debug");
level = browserbunyan.resolveLevel("info");
level = browserbunyan.resolveLevel("warn");
level = browserbunyan.resolveLevel("error");
level = browserbunyan.resolveLevel("fatal");
level = browserbunyan.resolveLevel(browserbunyan.TRACE);
level = browserbunyan.resolveLevel(browserbunyan.DEBUG);
level = browserbunyan.resolveLevel(browserbunyan.INFO);
level = browserbunyan.resolveLevel(browserbunyan.WARN);
level = browserbunyan.resolveLevel(browserbunyan.ERROR);
level = browserbunyan.resolveLevel(browserbunyan.FATAL);

var options:browserbunyan.LoggerOptions = {
    name: 'test-logger',
    serializers: browserbunyan.stdSerializers,
    streams: [{
        type: 'stream',
        stream: process.stdout,
        level: browserbunyan.TRACE
    }, {
        type: 'file',
        path: '/tmp/test.log',
        level: browserbunyan.DEBUG,
        closeOnExit: true
    }, {
        type: 'rotating-file',
        path: '/tmp/test2.log',
        level: browserbunyan.INFO,
        closeOnExit: false,
        period: '1d',
        count: 3
    }, {
        type: 'raw',
        stream: process.stderr,
        level: browserbunyan.WARN
    }, {
        type: 'raw',
        stream: ringBuffer,
        level: browserbunyan.ERROR
    }]
};

var log = browserbunyan.createLogger(options);

var customSerializer = function(anything: any) {
    return { obj: anything};
};

log.addSerializers({anything: customSerializer});
log.addSerializers(browserbunyan.stdSerializers);
log.addSerializers(
    {
        err: browserbunyan.stdSerializers.err,
        req: browserbunyan.stdSerializers.req,
        res: browserbunyan.stdSerializers.res
    }
);

var child = log.child({name: 'child'});
child.reopenFileStreams();
log.addStream({path: '/dev/null'});
child.level(browserbunyan.DEBUG);
child.level('debug');
child.levels(0, browserbunyan.ERROR);
child.levels(0, 'error');
child.levels('stream1', browserbunyan.FATAL);
child.levels('stream1', 'fatal');

var buffer = new Buffer(0);
var error = new Error('');
var object = {
    test: 123
};

log.trace(buffer);
log.trace(error);
log.trace(object);
log.trace('Hello, %s', 'world!');
log.debug(buffer);
log.debug(error);
log.debug(object);
log.debug('Hello, %s', 'world!');
log.info(buffer);
log.info(error);
log.info(object);
log.info('Hello, %s', 'world!');
log.warn(buffer);
log.warn(error);
log.warn(object);
log.warn('Hello, %s', 'world!');
log.error(buffer);
log.error(error);
log.error(object);
log.error('Hello, %s', 'world!');
log.fatal(buffer);
log.fatal(error);
log.fatal(object);
log.fatal('Hello, %s', 'world!');

var recursive: any = {
    hello: 'world',
    whats: {
        huh: recursive
    }
}

JSON.stringify(recursive, browserbunyan.safeCycles());