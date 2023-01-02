import { Spin } from 'antd';
import { WeaSwitch } from 'comsMobx';
import { WeaLocaleProvider, WeaAlertPage, WeaSearchGroup, WeaFormItem } from 'ecCom';
const getLabel = WeaLocaleProvider.getLabel;

// 渲染form表单: 一般对form的渲染都统一使用该方法
export const getSearchs = (form, condition, col, isCenter) => {
  const { isFormInit } = form;
  const formParams = form.getFormParams();
  let group = [];
  isFormInit && condition && condition.map(c =>{
    let items = [];
    c.items.map(fields => {
      items.push({
        com:(
          <WeaFormItem
            label={`${fields.label}`} // label 标签的文本
            labelCol={{span: `${fields.labelcol}`}} // label标签占一行比例
            wrapperCol={{span: `${fields.fieldcol}`}} // 右侧控件占一行比例
            error={form.getError(fields)} // 错误提示: 处理表单中有必填项,保存的校验
            tipPosition="bottom" // 错误提示的显示位置: top/bottom
          >
            <WeaSwitch
              fieldConfig={fields}
              form={form}
              formParams={formParams}
            />
          </WeaFormItem>),
        colSpan:1,
      })
    });
    group.push(
      <WeaSearchGroup
        col={col || 1} // 高级搜索列布局列数
        needTigger={true} // 是否开启收缩
        title={c.title || ''} // 高级搜索标题
        showGroup={c.defaultshow} // 是否开启面板
        items={items} // 条目数组数据
        center={isCenter || false} // 内容是否居中：一般弹框需要
      />)
  });
  return group;
}

// 页面加载中效果处理
export const renderLoading = (loading) => (
  <div className="wea-demo-loading">
    <Spin spinning={loading} />
  </div>
)
  
// 无权限处理
export const renderNoright = () => (
  <WeaAlertPage>
    <div>
      {getLabel(2012,'对不起，您暂时没有权限！')}
    </div>
  </WeaAlertPage>
)

// 暂无数据处理
export const renderNoData = () => (
  <WeaAlertPage>
    <div>
      暂无数据
    </div>
  </WeaAlertPage>
)