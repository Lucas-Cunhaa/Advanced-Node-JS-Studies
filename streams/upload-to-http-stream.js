import { Readable } from 'node:stream'

class OneToHundread extends Readable {
    index = 1

    _read() {
        const index = this.index++
        
        setTimeout(() => {
            this.push(index > 100 ? null : Buffer.from(String(index)))
        }, 1000);
        
    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundread(),
    duplex: 'half'
})
