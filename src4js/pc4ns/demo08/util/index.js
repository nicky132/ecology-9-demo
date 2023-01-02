import { Spin } from 'antd';
import { WeaLocaleProvider, WeaAlertPage } from 'ecCom';
const getLabel = WeaLocaleProvider.getLabel;

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