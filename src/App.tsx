import { useRef } from 'react';
import styles from './App.module.css';

type Site = {
    name: string;
    url: string;
    option?: {
        delimiter?: string;
    };
};

function App() {
    const inputRef = useRef<HTMLInputElement>(null);

    const sites: Site[] = [
        {
            name: 'ブックオフ公式オンラインストア',
            url: 'https://shopping.bookoff.co.jp/search/genre/31/keyword/<key>?per-page=120&sort=50',
        },
        {
            name: 'ニッポンシザイ.com',
            url: 'https://nipponshizai.co.jp/search?q=<key>&options%5Bprefix%5D=last&filter.v.price.gte=&filter.v.price.lte=&sort_by=price-ascending',
            option: {
                delimiter: '+',
            },
        },
        {
            name: '楽天市場',
            url: 'https://search.rakuten.co.jp/search/mall/<key>/101311/?s=11',
            option: {
                delimiter: '+',
            },
        },
        {
            name: 'Yahoo!ショッピング',
            url: 'https://shopping.yahoo.co.jp/search/<key>/0/?tab_ex=commerce&X=12&sc_i=shopping-pc-web-result-item-sort_mdl-sortitem',
            option: {
                delimiter: '+',
            },
        },
        {
            name: '駿河屋',
            url: 'https://www.suruga-ya.jp/search?category=&search_word=<key>&adult_s=2&rankBy=price%3Aascending',
        },
        {
            name: 'まんだらけ通販',
            url: 'https://order.mandarake.co.jp/order/listPage/list?soldOut=1&sort=price&sortOrder=0&categoryCode=0401&keyword=<key>',
        },
        {
            name: 'HMV',
            url: 'https://www.hmv.co.jp/used/search/?sort=priceasc&chkcategory=ctgryUsed&fmtcd=on&fmtsingle=on&keyword=<key>',
            option: {
                delimiter: '+',
            },
        },
        {
            name: 'Yahoo!オークション',
            url: 'https://auctions.yahoo.co.jp/opensearch?p=<key>&fixed=0&auccat=22192&mode=3&select=31',
            option: {
                delimiter: '+',
            },
        },
        {
            name: 'メルカリ',
            url: 'https://jp.mercari.com/search?keyword=<key>&category_id=75&order=asc&sort=price&status=on_sale',
        },
        {
            name: 'ラクマ',
            url: 'https://fril.jp/s?order=asc&query=<key>&sort=sell_price',
            option: {
                delimiter: '+',
            },
        },
    ];

    function searchByKeyword(index: number) {
        let keyword = inputRef.current?.value;
        if (keyword === undefined || keyword === '') {
            return;
        }
        const site = sites[index];
        if (site.option !== undefined) {
            if (site.option.delimiter !== undefined) {
                keyword = keyword.replaceAll(/\s/g, site.option.delimiter);
            }
        }
        window.open(site.url.replace('<key>', keyword));
    }

    return (
        <>
            <h1>森田検索</h1>
            <h2>中古CD検索ツール</h2>
            <label htmlFor="keyword">検索キーワード</label>
            <input type="text" id="keyword" ref={inputRef} />

            <ul className={styles.list}>
                {sites.map((item, index) => {
                    return (
                        <li key={index}>
                            <div>{item.name} </div>
                            <div>
                                <button onClick={() => searchByKeyword(index)}>
                                    検索
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default App;
