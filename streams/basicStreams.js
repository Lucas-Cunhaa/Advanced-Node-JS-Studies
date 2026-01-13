import { Readable, Writable, Transform } from 'node:stream'

class OneToHundread extends Readable {
    index = 1

    _read() {
        const index = this.index++
        
        setTimeout(() => {
            this.push(index > 100 ? null : Buffer.from(String(index)))
        }, 1000);
        
    }
}


class MultiplyByTen extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString() * 10))
        callback()
    }
}

class InverseNumber extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}

new OneToHundread()
.pipe(new InverseNumber())
.pipe(new MultiplyByTen())

