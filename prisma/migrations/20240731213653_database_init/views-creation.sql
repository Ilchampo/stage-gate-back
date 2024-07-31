-- Create view vw_release_summary
CREATE VIEW vw_release_summary AS
SELECT 
    r.id AS release_id,
    r.version,
    r.description,
    r.start_date,
    r.end_date,
    r.status,
    COUNT(f.id) AS total_features,
    COUNT(CASE WHEN f.status = 'approved' THEN 1 END) AS approved_features,
    COUNT(CASE WHEN f.status = 'rejected' THEN 1 END) AS rejected_features,
    COUNT(CASE WHEN f.status = 'updated' THEN 1 END) AS updated_features
FROM 
    tbl_release r
LEFT JOIN 
    tbl_feature f ON r.id = f.release_id
GROUP BY 
    r.id;

-- Create view vw_feature_reviews
CREATE VIEW vw_feature_reviews AS
SELECT 
    fr.id AS feature_review_id,
    f.id AS feature_id,
    f.pull_request_link,
    f.ticket_link,
    fr.reviewer_id,
    u.firstname AS reviewer_firstname,
    u.lastname AS reviewer_lastname,
    fr.functional,
    fr.clean_code,
    fr.feature_test,
    fr.security_checks,
    fr.status AS review_status,
    fr.comment,
    fr.reviewed_on
FROM 
    tbl_feature_review fr
JOIN 
    tbl_feature f ON fr.feature_id = f.id
JOIN 
    tbl_user u ON fr.reviewer_id = u.id;

-- Create view vw_user_notifications
CREATE VIEW vw_user_notifications AS
SELECT 
    un.id AS notification_id,
    un.workspace_id,
    un.user_id,
    un.feature_review_id,
    un.release_id,
    un.created_on,
    un.read_by_user,
    un.notification_type,
    un.status_type,
    fr.feature_id,
    f.pull_request_link,
    r.version AS release_version
FROM 
    tbl_user_notification un
LEFT JOIN 
    tbl_feature_review fr ON un.feature_review_id = fr.id
LEFT JOIN 
    tbl_feature f ON fr.feature_id = f.id
LEFT JOIN 
    tbl_release r ON un.release_id = r.id;

-- Create view vw_developer_perfomance
CREATE VIEW vw_developer_performance AS
SELECT 
    u.id AS developer_id,
    u.firstname,
    u.lastname,
    COUNT(f.id) AS total_features,
    COUNT(CASE WHEN f.status = 'approved' THEN 1 END) AS approved_features,
    AVG(fs.updated) AS avg_updates,
    SUM(fs.rejections) AS total_rejections
FROM 
    tbl_user u
JOIN 
    tbl_feature f ON u.id = f.developer_id
LEFT JOIN 
    tbl_feature_stat fs ON f.id = fs.feature_id
GROUP BY 
    u.id;
