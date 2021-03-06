// Type definitions for browser-bunyan 
// Project: https://github.com/philmander/browser-bunyan
// Definitions by: Paul Locwood <https://github.com/PaulLockwood>
//  essentially a copy for type definitions for node-bunyan with the module rename
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

import { EventEmitter } from 'events';

// browser-bunyan specific
export function ConsoleFormattedStream(): void;

declare class Logger extends EventEmitter {
    constructor(options: LoggerOptions);
    addStream(stream: Stream): void;
    addSerializers(serializers: Serializers | StdSerializers): void;
    child(options: LoggerOptions, simple?: boolean): Logger;
    child(obj: Object, simple?: boolean): Logger;
    reopenFileStreams(): void;

    level(): string | number;
    level(value: number | string): void;
    levels(name: number | string, value: number | string): void;

    fields: any;
    src: boolean;

    trace(error: Error, format?: any, ...params: any[]): void;
    trace(buffer: Buffer, format?: any, ...params: any[]): void;
    trace(obj: Object, format?: any, ...params: any[]): void;
    trace(format: string, ...params: any[]): void;
    debug(error: Error, format?: any, ...params: any[]): void;
    debug(buffer: Buffer, format?: any, ...params: any[]): void;
    debug(obj: Object, format?: any, ...params: any[]): void;
    debug(format: string, ...params: any[]): void;
    info(error: Error, format?: any, ...params: any[]): void;
    info(buffer: Buffer, format?: any, ...params: any[]): void;
    info(obj: Object, format?: any, ...params: any[]): void;
    info(format: string, ...params: any[]): void;
    warn(error: Error, format?: any, ...params: any[]): void;
    warn(buffer: Buffer, format?: any, ...params: any[]): void;
    warn(obj: Object, format?: any, ...params: any[]): void;
    warn(format: string, ...params: any[]): void;
    error(error: Error, format?: any, ...params: any[]): void;
    error(buffer: Buffer, format?: any, ...params: any[]): void;
    error(obj: Object, format?: any, ...params: any[]): void;
    error(format: string, ...params: any[]): void;
    fatal(error: Error, format?: any, ...params: any[]): void;
    fatal(buffer: Buffer, format?: any, ...params: any[]): void;
    fatal(obj: Object, format?: any, ...params: any[]): void;
    fatal(format: string, ...params: any[]): void;
}

interface LoggerOptions {
    name: string;
    streams?: Stream[];
    level?: string | number;
    stream?: NodeJS.WritableStream;
    serializers?: Serializers | StdSerializers;
    src?: boolean;
    [custom: string]: any;
}

interface Serializer {
    (input: any): any;
}

interface Serializers {
    [key: string]: Serializer
}

interface StdSerializers {
    err: Serializer;
    res: Serializer;
    req: Serializer;
}

interface Stream {
    type?: string;
    level?: number | string;
    path?: string;
    stream?: NodeJS.WritableStream | Stream;
    closeOnExit?: boolean;
    period?: string;
    count?: number;
}

export declare var stdSerializers: StdSerializers;

export declare var TRACE: number;
export declare var DEBUG: number;
export declare var INFO: number;
export declare var WARN: number;
export declare var ERROR: number;
export declare var FATAL: number;

export declare function resolveLevel(value: number | string): number;

export declare function createLogger(options: LoggerOptions): Logger;

declare class RingBuffer extends EventEmitter {
    constructor(options: RingBufferOptions);

    writable: boolean;
    records: any[];

    write(record: any): void;
    end(record?: any): void;
    destroy(): void;
    destroySoon(): void;
}

interface RingBufferOptions {
    limit?: number;
}

export declare function safeCycles(): (key: string, value: any) => any;
