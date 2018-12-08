module.exports = `
    INSERT INTO :tableName: (user_id,  repository_id, line_count)
    VALUES  ( :user_id, :repository_id, :line_count )
    ON CONFLICT (user_id, repository_id) DO UPDATE
    SET line_count = :line_count
    RETURNING *;
`
