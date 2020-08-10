import React, {useState,useEffect}from "react";
import {Button, Col, List, Row} from "antd";
function MessageList(props) {
    const [list, setList] = useState([])

    useEffect(()=>{
        // getList()
    })

    const getList = () => {
        let list = [11111.222]
        setList(list)
    }
    //删除评论
    const delMessage = (id, checked) => {
        alert(checked)
    }
    return(
        <div>
            <List header={<Row className="list-div">
                <Col span={8}>
                    <b>文章名</b>
                </Col>
                <Col span={3}>
                    <b>文章类型</b>
                </Col>
                <Col span={3}>
                    <b>创建时间</b>
                </Col>
                <Col span={3}>
                    <b>内容</b>
                </Col>
                <Col span={3}>
                    <b>回复数</b>
                </Col>
                <Col span={4}>
                    <b>操作</b>
                </Col>
            </Row>}
                  bordered
                  dataSource={list}
                  renderItem={item => (<List.Item>
                          <Row className="list-div">
                              <Col span={8}>
                                  {item.title}
                              </Col>
                              <Col span={3}>
                                  {item.typeName}
                              </Col>
                              <Col span={3}>
                                  {item.addTime}
                              </Col>
                              <Col span={3}>
                                  共<span>{item.part_count}</span>集
                              </Col>
                              <Col span={3}>
                                  {item.view_count}
                              </Col>
                              <Col span={4}>
                                  <Button type="primary">修改</Button>
                                  <Button onClick={() => {delMessage(item.id)}}>删除 </Button>
                              </Col>
                          </Row>
                      </List.Item>
                  )}
            />
        </div>
    )
}
export default MessageList
