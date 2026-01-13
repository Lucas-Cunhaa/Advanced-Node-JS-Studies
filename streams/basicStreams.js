import { Readable, Writable } from 'node:stream'

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

new OneToHundread().pipe(new MultiplyByTen())

