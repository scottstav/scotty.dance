module "mailer" {
  source                = "github.com/samstav/tf_mailgun_aws"
  domain                = "${var.domain}"
  mailgun_smtp_password = "${var.mailgun_smtp_password}"
}

resource "aws_route53_record" "root" {
   zone_id = "${module.mailer.zone_id}"
   name = "${var.domain}"
   type = "A"
   ttl = "300"
   records = ["s3-website-us-east-1.amazonaws.com."]
}

resource "aws_route53_record" "www" {
   zone_id = "${module.mailer.zone_id}"
   name = "www.${var.domain}"
   type = "A"
   ttl = "300"
   records = ["s3-website-us-east-1.amazonaws.com."]
}
