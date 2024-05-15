
import pool from './pgConfig';


export async function sID(orderID: string): Promise<any> {
    const query = 'INSERT INTO orders (orderID) VALUES ($1)';
    const result = await pool.query(query, [orderID]);
    return result;
}
//orders table is in pg
