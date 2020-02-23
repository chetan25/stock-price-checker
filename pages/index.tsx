import Head from 'next/head';
import { useState } from 'react';
import { Card, Input, Spin, Result } from 'antd';
import StockDetails from 'Components/stock-details';
import SearchService, { IStockInfo } from 'Services/search';
import 'Assets/index.less';
import {ResultStatusType} from "Root/node_modules/antd/lib/result";

const { Search } = Input;

interface IError {
    hasError: boolean;
    errorCode?: ResultStatusType;
    message: string | null;
}

const defaultErrorState = {
    hasError: false,
    message: null,
};

const errorCodeMap = {
 404: {
     code: '404',
     message: 'Sorry, the symbol you searched seems to be invalid.',
 },
 500: {
     code: '500',
     message: 'Sorry, the server is down.',
 },
 'default': {
     code: '500',
     message: 'Sorry, there is an unknown Error',
 }
};

const Home = () => {
    const [searchString, setSearchString] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [searchData, setSearchData] = useState<IStockInfo| null>(null);
    const [error, setError] = useState<IError>(defaultErrorState);

    const searchSymbol = (value: string): void => {
        if(value.length === 0) {
            return;
        }
        setLoading(true);
        SearchService.searchSymbol(value)
            .then(data => {
                setError(defaultErrorState);
                setSearchData(data);
                setLoading(false);
            })
            .catch(error => {
                const errorData =
                    errorCodeMap[error.response.status] ? errorCodeMap[error.response.status] : errorCodeMap['default'];
                setError({
                    hasError: true,
                    errorCode: errorData['code'],
                    message: errorData['message']
                });
                setLoading(false);
                setSearchData(null);
            });
    };

    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        setSearchString(value);
    };

    return (
        <div className='home-container'>
            <Head>
                <title>Search Stock Info</title>
                <link rel='icon' href='/scc-logo-icon.png' />
            </Head>
            <main>
                <div className='title-home'>
                    <h3>Search Stock Info By Stock Symbol</h3>
                </div>
                <div className='content-wrapper'>
                    <Spin tip='Searching...' spinning={loading}>
                        <Card
                            title={
                                <Search
                                    style={{ width: 300 }}
                                    placeholder='Enter Symbol'
                                    onChange={onValueChange}
                                    value={searchString}
                                    onSearch={value => searchSymbol(value)}
                                    enterButton
                                />
                            }
                        >
                            <div>
                                {
                                    error.hasError ?
                                        <Result
                                            status={error.errorCode}
                                            title={error.errorCode}
                                            subTitle={error.message}
                                            extra=''
                                        />
                                        :
                                        <StockDetails data={searchData}></StockDetails>
                                }
                            </div>
                        </Card>
                    </Spin>
                </div>
            </main>
            <footer>
            </footer>
        </div>
    );
};

export default Home
