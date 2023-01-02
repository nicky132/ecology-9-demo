package com.engine.demo.demo06.cmd;

import com.engine.common.biz.AbstractCommonCommand;
import com.engine.common.entity.BizLogContext;
import com.engine.core.interceptor.CommandContext;
import org.apache.poi.ss.usermodel.*;

import weaver.conn.RecordSet;
import weaver.file.ImageFileManager;
import weaver.general.Util;
import weaver.hrm.User;
import weaver.systeminfo.SystemEnv;

import java.text.SimpleDateFormat;
import java.util.*;


public class WeatableImpExcelDemoCmd  extends AbstractCommonCommand<Map<String,Object>> {

    public WeatableImpExcelDemoCmd(User user, Map<String,Object> params) {
        this.user = user;
        this.params = params;
    }

    @Override
    public BizLogContext getLogContext() {
        return null;
    }

    @Override
    public Map<String, Object> execute(CommandContext commandContext) {
        Map<String, Object> retmap = new HashMap<String, Object>();
        RecordSet rs = new RecordSet();
        String sql = "";
        try{



            //起始获取数据行数
            int startRow=1;

            String fileid = Util.null2String(params.get("fileid"));
            ImageFileManager manager =new ImageFileManager();
            manager.getImageFileInfoById(Util.getIntValue(fileid));
            Workbook workbook= WorkbookFactory.create(manager.getInputStream());
            for (int idx = 0; idx < workbook.getNumberOfSheets(); idx++) {
                Sheet sheet = workbook.getSheetAt(idx);
                Row row = null;

                for (int i = startRow; startRow<=sheet.getLastRowNum() && i <= sheet.getLastRowNum(); i++) {
                    row = sheet.getRow(i);
                    if (row == null) {
                        continue;
                    }
                    String id= UUID.randomUUID().toString();


                    //非日期格式将数值型转为字符型
                    row.getCell(1).setCellType(CellType.STRING);
                    row.getCell(2).setCellType(CellType.STRING);
                    row.getCell(3).setCellType(CellType.STRING);
                    row.getCell(5).setCellType(CellType.STRING);

                    String requestname=row.getCell(1).getStringCellValue();
                    String creater=row.getCell(2).getStringCellValue();
                    String state=row.getCell(3).getStringCellValue();
                    //日期格式单独处理
                    Date datetime= row.getCell(4).getDateCellValue();
                    SimpleDateFormat sft = new SimpleDateFormat("yyyy-MM-dd");
                    String date=String.valueOf(sft.format(datetime));

                    String type=row.getCell(5).getStringCellValue();
                    sql = "insert into ECOLOGY_PC_DEMO_WORKFOLW  values (?,?,?,?,?,?) ";
                    rs.executeUpdate(sql,id,requestname,creater,state,date,type);
                }

            }
            retmap.put("status", "1");
        }catch (Exception e){
            retmap.put("status", "-1");
            retmap.put("message", SystemEnv.getHtmlLabelName(382661, user.getLanguage()));
            writeLog(e);
        }
        return retmap;
    }
}
