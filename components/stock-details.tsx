import { Empty, List } from 'antd';
import { IStockInfo } from 'Services/search';

interface IProps {
   data: IStockInfo | null
}

const StockDetails = (props: IProps) => {
    const { data } = props;

    return (
        <div className='details-wrapper'>
            {
                data ?
                    <div>
                        <List
                            itemLayout="horizontal"
                            data-testid="list-element"
                        >
                            <List.Item>
                                <List.Item.Meta
                                    title='Company'
                                    description={data?.companyName}
                                />
                            </List.Item>
                            <List.Item>
                                <List.Item.Meta
                                    title='Symbol'
                                    description={data?.symbol}
                                />
                            </List.Item>
                            <List.Item>
                                <List.Item.Meta
                                    title='Current Stock Price'
                                    description={data?.price}
                                />
                            </List.Item>
                            <List.Item>
                                <List.Item.Meta
                                    title='Description'
                                    description={data?.description}
                                />
                            </List.Item>
                        </List>
                    </div>
                    :
                    <div className='empty-state'>
                        <Empty/>
                    </div>
            }
        </div>
    );
};

export default StockDetails;