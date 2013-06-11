-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 11, 2013 at 12:45 PM
-- Server version: 5.1.44
-- PHP Version: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `pagechangedemo`
--

-- --------------------------------------------------------

--
-- Table structure for table `links`
--

CREATE TABLE IF NOT EXISTS `links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(65000) NOT NULL,
  `md5hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `links`
--

INSERT INTO `links` (`id`, `url`, `md5hash`) VALUES
(1, 'www.andm.gov.za/Pages/Vacancies.aspx', '4a86174c914388ce54be841e1859f885'),
(2, 'www.chrishanidm.gov.za/vacancies', 'e6be199727ccd74cc302f899b7501f0d'),
(3, 'www.lejwe.co.za/?page_id=1692', ''),
(4, 'www.sedibeng.gov.za/vacancies.html', '85eaae31d04980792b0e33a4e1715a17'),
(6, 'www.amajuba.gov.za/taxonomy/term/46', '9dfcb2fb9863cb0fe860f1d558af9842'),
(7, 'www.ilembe.gov.za/index.php/administration/careers', '7afa95c6b77fa6a0feed8d077eb5651e'),
(8, 'www.sisonke.gov.za/Vacancies.aspx', '5f9dac37cb5c12191aeff72f915f94db'),
(9, 'www.ugu.gov.za/vacancies.html', '2819005ef23b0e2e03efa40a39873cb6'),
(10, 'www.uthungulu.org.za/uThungulu/node/8', ''),
(11, 'www.sekhukhune.gov.za/vacancies.html', 'abd78db2d4d14e715c7929cd4927cccc'),
(12, 'www.cdmunicipality.wsiefusion.net/Vacancies', ''),
(13, 'www.vhembe.gov.za/index.php?page=vacancies', 'c1ad3107918bb0442beb197fbae15897');
