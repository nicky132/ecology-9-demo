import React from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

import { Button, Modal } from 'antd';
import { WeaTableNew } from 'comsMobx';
import { WeaTop, WeaTab, WeaRightMenu, WeaDialog } from 'ecCom';

import { renderNoright, getSearchs } from '../util'; // 渲染form数据的方法：因为多个页面都会使用，所以抽的公共方法在util中
import { doEdit } from '../apis';

const WeaTable = WeaTableNew.WeaTable;

@inject('editTableStore')
@observer
export default class BaseTable extends React.Component {
  componentWillMount() { // 初始化渲染页面
    const { editTableStore: { doInit } } = this.props;
    doInit();
  }

  componentWillReceiveProps(nextProps) {
    const { editTableStore } = this.props;
    if (this.props.location.key !== nextProps.location.key) { // 手动刷新、切换菜单 重新初始化
      editTableStore.doInit();
    }
  }

  // 显示列定制
  showColumn = () => {
    const { editTableStore: { tableStore} } = this.props;
    tableStore.setColSetVisible(true);
    tableStore.tableColSet(true);
  }

  // 新增
  onAdd = () => {
    const { editTableStore: { setState } } = this.props;
    setState({
      isCreate: true,
      editId: '',
      visible: true,
    });
  }

  // 编辑
  onEdit = (record) => {
    const { editTableStore: { setState, dialogForm } } = this.props;
    setState({
      isCreate: false,
      editId: record.id,
      visible: true,
    });
    dialogForm.updateFields({
      requestname: { // 请求标题（一般form更新值使用方式）
        value: record.requestname,
      },
      creater: { // 创建人:（浏览按钮更新值）-- demo这里后台没数据可能渲染不出
        value: record.creater,
        valueSpan: record.createrspan,
        valueObj: {
          id: record.creater,
          name: record.createrspan,
        }
      },
      state: { // 状态
        value: record.state,
      },
      type: { // 类型
        value: record.type,
      },
      creatertime: { // 创建时间
        value: record.creatertime,
      },
    })
  }

  // 关闭弹框
  onCancel = () => {
    const { editTableStore: { setState, dialogForm, dialogFormCondition, initDialogForm } } = this.props;
    setState({
      isCreate: true,
      editId: '',
      visible: false,
    });
    initDialogForm();
  }

  onOperatesClick = (record, index, operate, flag) => {
    const { editTableStore: { doDelete } } = this.props;
    switch(operate.index.toString()){
      case '0': // 编辑
        this.onEdit(record);
        break;
      case '1': // 删除
        Modal.confirm({
          title: '系统提示',
          content: '确定删除吗?',
          onOk: () => {
            doDelete(record.id)
          },
        });
        break;
      default:
        break;
    }
  };

  showColumn = () => {
    const { baseTableStore: { tableStore } } = this.props;
    tableStore.setColSetVisible(true);
    tableStore.tableColSet(true);
  }

  // 增加编辑功能，重写columns绑定事件
  getColumns = (columns) => {
    let newColumns = '';
    newColumns = columns.map(column => {
      let newColumn = column;
      newColumn.render = (text, record, index) => { //前端元素转义
        let valueSpan = record[newColumn.dataIndex + "span"] !== undefined ? record[newColumn.dataIndex + "span"] : record[newColumn.dataIndex];
        return (
          newColumn.dataIndex == 'requestname' ?
            <a onClick={() => {this.onEdit(record)}}
               dangerouslySetInnerHTML={{ __html: valueSpan }} />
            :
            <div dangerouslySetInnerHTML={{ __html: valueSpan }} />
        )
      }
      return newColumn;
    });
    return newColumns;
  }
  
  render() {
    const { editTableStore } = this.props;
    const { loading, hasRight, form, condition, tableStore, showSearchAd, isCreate, visible, dialogForm, dialogFormCondition,
      getTableDatas, doSearch, setShowSearchAd, doDialogSave, doDialogCancel, doDelete, doSave
    } = editTableStore;
    const selectedRowKeys = toJS(tableStore.selectedRowKeys) || []; // tableStore 右侧选中数组

    if (!hasRight && !loading) { // 无权限处理
      return renderNoright();
    }

    const rightMenu = [// 右键菜单
      {
        key: 'BTN_NEW',
        icon: <i className='icon-coms-New-Flow'/>,
        content : '新增',
        onClick : this.onAdd
      },
      {
        key: 'BTN_DEL',
        icon: <i className='icon-coms-delete'/>,
        content : '批量删除',
        disable: selectedRowKeys.length === 0, // 没有选中禁用
        onClick : doDelete,
      },
      {
        key: 'BTN_COLUMN',
        icon: <i className='icon-coms-Custom'/>,
        content : '显示列定制',
        onClick : this.showColumn
      },
    ];
    const collectParams = { // 收藏功能配置
      favname: '可编辑列表',
      favouritetype: 1,
      objid: 0,
      link: 'wui/index.html#/ns_demo06/index',
      importantlevel: 1,
    };
    const adBtn = [ // 高级搜索内部按钮
      <Button type="primary" onClick={doSearch}>搜索</Button>,
      <Button type="ghost" onClick={() => form.resetForm()}>重置</Button>,
      <Button type="ghost" onClick={() => setShowSearchAd(false)}>取消</Button>,
    ];
    const btns = [ // 顶部按钮
      <Button type='primary' onClick={this.onAdd}>新增</Button>,
      <Button type='primary' disable={selectedRowKeys.length === 0} onClick={this.delete}>批量删除</Button>,
    ];

    return (
      <div style={{ height: '100%' }}>
        <WeaRightMenu
          datas={rightMenu} // 右键菜单
          collectParams={collectParams} // 收藏功能: 配置之后显示 收藏、帮助、显示页面地址 这3个功能
        >
          <WeaTop
            title="可编辑列表" // 文字
            icon={<i className='icon-coms-meeting' />} // 左侧图标
            iconBgcolor='#F14A2D' // 左侧图标背景色
            buttons={btns} // 顶部按钮
            buttonSpace={10} // 按钮之间的间隔
            showDropIcon={true} // 是否显示下拉按钮
            dropMenuDatas={rightMenu} // 下拉菜单（和页面的右键菜单相同）
            dropMenuProps={{ collectParams }} // 收藏功能: 配置之后显示 收藏、帮助、显示页面地址 这3个功能
          >
            <WeaTab
              searchType={['base', 'advanced']} // base：基础搜索框 advanced：显示高级搜索按钮
              showSearchAd={showSearchAd} // 是否展开高级搜索面板
              setShowSearchAd={bool => setShowSearchAd(bool)} //高级搜索面板受控
              searchsAd={getSearchs(form, toJS(condition), 2)} // 高级搜索内部数据
              buttonsAd={adBtn} // 高级搜索内部按钮
              onSearch={getTableDatas} // 点搜索按钮时的回调
              onSearchChange={v => form.updateFields({ requestname: v })} // 在搜索框中输入的文字改变时的回调: 这里需要同步高级搜索和外部搜索框的值
              searchsBaseValue={form.getFormParams().requestname} // 外部input搜索值受控: 这里和高级搜索的requestname同步
            />
            <WeaTable // table内部做了loading加载处理，页面就不需要再加了
              comsWeaTableStore={tableStore} // table store
              hasOrder={true} // 是否启用排序
              needScroll={true} // 是否启用table内部列表滚动，将自适应到父级高度
              getColumns={this.getColumns} // 重定列各列属性(一般带编辑功能，点击第一列字段的时候需要同样打开编辑弹框)
              onOperatesClick={this.onOperatesClick.bind(this)} // 自定义操作按钮点击方法
            />
          </WeaTop>
        </WeaRightMenu>
        <WeaDialog
          style={{width: 750, height: 200 }} // Dialog宽高
          title={isCreate ? '新建' : '编辑' } // Dialog标题
          icon='icon-coms-meeting' // Dialog顶部标题的图标
          iconBgcolor='#F14A2D' // Dialog顶部标题的图标的背景色
          visible={visible} // Dialog显影
          buttons={[<Button type='primary' onClick={doSave}>保存</Button>,]} // Dialog 底部操作按钮
          onCancel={this.onCancel} // 关闭 Dialog 时的回调函数
          moreBtn={{ // ‘更多’按钮参数配置, 具体参数使用查看 WeaMoreButton 文档
            datas: [{
              key: 'BTN_SAVE',
              icon: <i className='icon-coms-Preservation'/>,
              content : '保存',
              onClick : doSave,
            }],
            collectParams: collectParams
          }}
        >
          {// 弹框内部渲染数据
            getSearchs(dialogForm, dialogFormCondition, 1, true)
          }
        </WeaDialog>
      </div>
    )
  }
}