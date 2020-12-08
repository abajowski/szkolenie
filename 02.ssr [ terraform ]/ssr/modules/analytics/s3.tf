resource "aws_s3_bucket" "events" {
  bucket = "events-${var.environment}-${var.application}"
  acl    = "private"

  tags = {
    Name        = "events-${var.environment}-${var.application}"
    Environment = var.environment
  }
}
