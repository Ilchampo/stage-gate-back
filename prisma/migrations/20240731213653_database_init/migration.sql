-- CreateEnum
CREATE TYPE "ReleaseStatus" AS ENUM ('complete', 'in_progress', 'on_hold', 'canceled');

-- CreateEnum
CREATE TYPE "FieldStatus" AS ENUM ('yes', 'no', 'na');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('approved', 'rejected', 'updated');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('manager', 'collaborator', 'admin');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('status_approved', 'status_rejected', 'status_updated', 'status_complete', 'status_reminder', 'status_alert');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('feature_review_type', 'feature_type', 'release_type');

-- CreateTable
CREATE TABLE "tbl_log" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_platform_feature" (
    "id" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_platform_feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_workspace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "repository" TEXT NOT NULL,
    "logo" BYTEA,
    "code" TEXT NOT NULL,

    CONSTRAINT "tbl_workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_workspace_setting" (
    "id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "max_managers" INTEGER NOT NULL DEFAULT 1,
    "max_collaborators" INTEGER NOT NULL,
    "feature_reviewers" INTEGER NOT NULL,

    CONSTRAINT "tbl_workspace_setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_user" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" BYTEA,

    CONSTRAINT "tbl_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_user_login" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "on_boarding" BOOLEAN NOT NULL,
    "verified_email" BOOLEAN NOT NULL,
    "privacy_policy" BOOLEAN NOT NULL,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "tbl_user_login_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_user_notification" (
    "id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "feature_review_id" TEXT,
    "release_id" TEXT,
    "created_on" TIMESTAMP(3) NOT NULL,
    "read_by_user" BOOLEAN NOT NULL,
    "notification_type" "NotificationType" NOT NULL,
    "status_type" "NotificationStatus" NOT NULL,

    CONSTRAINT "tbl_user_notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_release" (
    "id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "status" "ReleaseStatus" NOT NULL,

    CONSTRAINT "tbl_release_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_feature" (
    "id" TEXT NOT NULL,
    "release_id" TEXT NOT NULL,
    "developer_id" TEXT NOT NULL,
    "pull_request_link" TEXT NOT NULL,
    "ticket_link" TEXT,
    "status" "ReviewStatus" NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_feature_review" (
    "id" TEXT NOT NULL,
    "feature_id" TEXT NOT NULL,
    "reviewer_id" TEXT NOT NULL,
    "functional" BOOLEAN NOT NULL,
    "clean_code" "FieldStatus" NOT NULL,
    "feature_test" "FieldStatus" NOT NULL,
    "security_checks" "FieldStatus",
    "status" "ReviewStatus" NOT NULL,
    "comment" VARCHAR(1000) NOT NULL,
    "reviewed_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_feature_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_feature_update" (
    "id" TEXT NOT NULL,
    "feature_id" TEXT NOT NULL,
    "comment" VARCHAR(1000) NOT NULL,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_feature_update_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_feature_stat" (
    "id" TEXT NOT NULL,
    "feature_id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "completion_date" TIMESTAMP(3),
    "rejections" INTEGER NOT NULL DEFAULT 0,
    "updated" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tbl_feature_stat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vw_release_summary" (
    "release_id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "status" "ReleaseStatus" NOT NULL,
    "total_features" INTEGER NOT NULL,
    "approved_features" INTEGER NOT NULL,
    "rejected_features" INTEGER NOT NULL,
    "updated_features" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "vw_feature_reviews" (
    "feature_review_id" TEXT NOT NULL,
    "feature_id" TEXT NOT NULL,
    "pull_request_link" TEXT NOT NULL,
    "ticketLink" TEXT,
    "reviewer_id" TEXT NOT NULL,
    "reviewer_firstname" TEXT NOT NULL,
    "reviewer_lastname" TEXT NOT NULL,
    "functional" BOOLEAN NOT NULL,
    "clean_code" "FieldStatus" NOT NULL,
    "feature_test" "FieldStatus" NOT NULL,
    "securityChecks" "FieldStatus",
    "review_status" "ReviewStatus" NOT NULL,
    "comment" VARCHAR(1000) NOT NULL,
    "reviewed_on" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "vw_user_notifications" (
    "notification_id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "feature_review_id" TEXT,
    "release_id" TEXT,
    "created_on" TIMESTAMP(3) NOT NULL,
    "read_by_user" BOOLEAN NOT NULL,
    "notification_type" "NotificationType" NOT NULL,
    "status_type" "NotificationStatus" NOT NULL,
    "feature_id" TEXT,
    "pull_request_link" TEXT,
    "release_version" TEXT
);

-- CreateTable
CREATE TABLE "vw_developer_performance" (
    "developer_id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "total_features" INTEGER NOT NULL,
    "approved_features" INTEGER NOT NULL,
    "avg_updates" DOUBLE PRECISION NOT NULL,
    "total_rejections" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_platform_feature_feature_key" ON "tbl_platform_feature"("feature");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_workspace_repository_key" ON "tbl_workspace"("repository");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_workspace_code_key" ON "tbl_workspace"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_workspace_setting_workspace_id_key" ON "tbl_workspace_setting"("workspace_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_email_key" ON "tbl_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_release_version_key" ON "tbl_release"("version");

-- AddForeignKey
ALTER TABLE "tbl_workspace_setting" ADD CONSTRAINT "tbl_workspace_setting_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "tbl_workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user_login" ADD CONSTRAINT "tbl_user_login_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user_notification" ADD CONSTRAINT "tbl_user_notification_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "tbl_workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user_notification" ADD CONSTRAINT "tbl_user_notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user_notification" ADD CONSTRAINT "tbl_user_notification_feature_review_id_fkey" FOREIGN KEY ("feature_review_id") REFERENCES "tbl_feature_review"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user_notification" ADD CONSTRAINT "tbl_user_notification_release_id_fkey" FOREIGN KEY ("release_id") REFERENCES "tbl_release"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_release" ADD CONSTRAINT "tbl_release_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "tbl_workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_feature" ADD CONSTRAINT "tbl_feature_release_id_fkey" FOREIGN KEY ("release_id") REFERENCES "tbl_release"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_feature" ADD CONSTRAINT "tbl_feature_developer_id_fkey" FOREIGN KEY ("developer_id") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_feature_review" ADD CONSTRAINT "tbl_feature_review_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "tbl_feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_feature_review" ADD CONSTRAINT "tbl_feature_review_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_feature_update" ADD CONSTRAINT "tbl_feature_update_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "tbl_feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_feature_stat" ADD CONSTRAINT "tbl_feature_stat_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "tbl_feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;