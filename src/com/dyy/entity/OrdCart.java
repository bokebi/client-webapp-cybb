package com.dyy.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class OrdCart implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
     * 任务单主键（PK)<br/>
     * 对应数据库字段 ord_cart.id
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    private Long id;

    /**
     * 客户ID对应cus_customer.id<br/>
     * 对应数据库字段 ord_cart.customer_id
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    private Long customerId;

    /**
     * 订单来源（0pc，1wap，2线下）<br/>
     * 对应数据库字段 ord_cart.source
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    private String source;

    /**
     * 所属公司关联sys_company.id<br/>
     * 对应数据库字段 ord_cart.company_id
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    private Long companyId;

    /**
     * 是否已经失效<br/>
     * 对应数据库字段 ord_cart.record_status
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    private String recordStatus;

    /**
     * 记录更新次数<br/>
     * 对应数据库字段 ord_cart.update_count
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    private Integer updateCount;

    /**
     * 记录创建日期<br/>
     * 对应数据库字段 ord_cart.create_date
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    private Date createDate;

    /**
     * 记录创建者ID<br/>
     * 对应数据库字段 ord_cart.creator_id
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    private Long creatorId;

    /**
     * 更新日期<br/>
     * 对应数据库字段 ord_cart.update_date
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    private Date updateDate;

    /**
     * 更新者ID<br/>
     * 对应数据库字段 ord_cart.updater_id
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    private Long updaterId;


    /**
     * 返回: 任务单主键（PK)<br>
     * 对应数据库字段: ord_cart.id
     *
     * @返回  ord_cart.id
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    public Long getId() {
        return id;
    }

    /**
     *  设置: 任务单主键（PK)<br>
     * 对应数据库字段: ord_cart.id
     *
     * @param id 任务单主键（PK)
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 返回: 客户ID对应cus_customer.id<br>
     * 对应数据库字段: ord_cart.customer_id
     *
     * @返回  ord_cart.customer_id
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    public Long getCustomerId() {
        return customerId;
    }

    /**
     *  设置: 客户ID对应cus_customer.id<br>
     * 对应数据库字段: ord_cart.customer_id
     *
     * @param customerId 客户ID对应cus_customer.id
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    /**
     * 返回: 订单来源（0pc，1wap，2线下）<br>
     * 对应数据库字段: ord_cart.source
     *
     * @返回  ord_cart.source
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    public String getSource() {
        return source;
    }

    /**
     *  设置: 订单来源（0pc，1wap，2线下）<br>
     * 对应数据库字段: ord_cart.source
     *
     * @param source 订单来源（0pc，1wap，2线下）
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    public void setSource(String source) {
        this.source = source == null ? null : source.trim();
    }

    /**
     * 返回: 所属公司关联sys_company.id<br>
     * 对应数据库字段: ord_cart.company_id
     *
     * @返回  ord_cart.company_id
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    public Long getCompanyId() {
        return companyId;
    }

    /**
     *  设置: 所属公司关联sys_company.id<br>
     * 对应数据库字段: ord_cart.company_id
     *
     * @param companyId 所属公司关联sys_company.id
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    /**
     * 返回: 是否已经失效<br>
     * 对应数据库字段: ord_cart.record_status
     *
     * @返回  ord_cart.record_status
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    public String getRecordStatus() {
        return recordStatus;
    }

    /**
     *  设置: 是否已经失效<br>
     * 对应数据库字段: ord_cart.record_status
     *
     * @param recordStatus 是否已经失效
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    public void setRecordStatus(String recordStatus) {
        this.recordStatus = recordStatus == null ? null : recordStatus.trim();
    }

    /**
     * 返回: 记录更新次数<br>
     * 对应数据库字段: ord_cart.update_count
     *
     * @返回  ord_cart.update_count
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    public Integer getUpdateCount() {
        return updateCount;
    }

    /**
     *  设置: 记录更新次数<br>
     * 对应数据库字段: ord_cart.update_count
     *
     * @param updateCount 记录更新次数
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    public void setUpdateCount(Integer updateCount) {
        this.updateCount = updateCount;
    }

    /**
     * 返回: 记录创建日期<br>
     * 对应数据库字段: ord_cart.create_date
     *
     * @返回  ord_cart.create_date
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    public Date getCreateDate() {
        return createDate;
    }

    /**
     *  设置: 记录创建日期<br>
     * 对应数据库字段: ord_cart.create_date
     *
     * @param createDate 记录创建日期
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    /**
     * 返回: 记录创建者ID<br>
     * 对应数据库字段: ord_cart.creator_id
     *
     * @返回  ord_cart.creator_id
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    public Long getCreatorId() {
        return creatorId;
    }

    /**
     *  设置: 记录创建者ID<br>
     * 对应数据库字段: ord_cart.creator_id
     *
     * @param creatorId 记录创建者ID
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }

    /**
     * 返回: 更新日期<br>
     * 对应数据库字段: ord_cart.update_date
     *
     * @返回  ord_cart.update_date
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    public Date getUpdateDate() {
        return updateDate;
    }

    /**
     *  设置: 更新日期<br>
     * 对应数据库字段: ord_cart.update_date
     *
     * @param updateDate 更新日期
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    /**
     * 返回: 更新者ID<br>
     * 对应数据库字段: ord_cart.updater_id
     *
     * @返回  ord_cart.updater_id
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    public Long getUpdaterId() {
        return updaterId;
    }

    /**
     *  设置: 更新者ID<br>
     * 对应数据库字段: ord_cart.updater_id
     *
     * @param updaterId 更新者ID
     *
     * @mbggenerated 2016-12-20 11:29
     */
    
    public void setUpdaterId(Long updaterId) {
        this.updaterId = updaterId;
    }
    
    private List<OrdCartItem> ordCartItems;


	public List<OrdCartItem> getOrdCartItems() {
		return ordCartItems;
	}

	public void setOrdCartItems(List<OrdCartItem> ordCartItems) {
		this.ordCartItems = ordCartItems;
	}

    
}