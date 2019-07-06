import Axios from 'axios';

class Scrapper {
    static async getBetter(name, price) {
        return (new Promise((resolve) => {
            let response = [];
            let ip = 'http://127.0.0.1:5000/analyse';
            Axios.get(ip + "?title=" + name + '&price=' + price).then(
                (res) => {
                    let c = -1;
                    let len = res.data.length;
                    while (++c < len) {
                        let str = res.data[c].match.split('.')[1];
                        response.push(str);
                    }
                    resolve(response);
                },
                (err) => {
                    console.log(err);
                }
            )
        }));
    }
}

export default Scrapper;