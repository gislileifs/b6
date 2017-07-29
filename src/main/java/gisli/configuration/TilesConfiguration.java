package gisli.configuration;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.web.servlet.view.UrlBasedViewResolver;
import org.springframework.web.servlet.view.tiles3.TilesConfigurer;
import org.springframework.web.servlet.view.tiles3.TilesView;
 
/**
 * @author gislileifsson
 *
 */
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "gisli")
//@Import({ SecurityConfig.class })
public class TilesConfiguration extends WebMvcConfigurerAdapter {
	private static final Logger logger = Logger.getLogger(TilesConfiguration.class);

	@Bean
    public ViewResolver plainViewResolver() {
		logger.debug("Creating plain view resolver");
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setViewClass(JstlView.class);
        viewResolver.setPrefix("/WEB-INF/views/");
        viewResolver.setOrder(2);
        viewResolver.setSuffix(".jsp");
 
        return viewResolver;
    }
  
    
    @Bean
    public UrlBasedViewResolver viewResolver() {
    	logger.debug("Creating URL based view resolver");
        UrlBasedViewResolver viewResolver = new UrlBasedViewResolver();
        viewResolver.setViewClass(TilesView.class);
        viewResolver.setOrder(1);
        return viewResolver;
    }
  /*  
    @Bean
    public ViewResolver ajaxViewResolver() {
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        //viewResolver.setViewClass(JstlView.class);
        viewResolver.setPrefix("/WEB-INF/views/");
        viewResolver.setSuffix(".jsp");
        return viewResolver;
    }

    @Bean
    public AjaxUrlBasedViewResolver ajaxViewResolver() {
        AjaxUrlBasedViewResolver viewResolver = new UrlBasedViewResolver();
        viewResolver.setViewClass(TilesView.class);
        return viewResolver;
    }
  */  
    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
    	logger.debug("Adding resources");
        registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
        registry.addResourceHandler("/img/**").addResourceLocations("/resources/img/");
        registry.addResourceHandler("/images/**").addResourceLocations("file:/Library/apache-tomcat-8.0.33/img/");
    }

    @Bean
    public TilesConfigurer tilesConfigurer() {
        TilesConfigurer tilesConfigurer = new TilesConfigurer();
        tilesConfigurer.setDefinitions(new String[]{
                "/WEB-INF/tiles/tiles.xml",
                "/WEB-INF/views/**/tiles.xml"
        });
        tilesConfigurer.setCheckRefresh(true);
        return tilesConfigurer;
    }
 /*
	@Bean(name = "dataSource")
	public DriverManagerDataSource dataSource() {
		logger.debug( "MySQL Datasource being initialized..." );
	    DriverManagerDataSource driverManagerDataSource = new DriverManagerDataSource();
	    //driverManagerDataSource.setDriverClassName("com.mysql.jdbc.Driver");
	    driverManagerDataSource.setUrl("jdbc:mysql://192.168.2.108:3306/test");
	    driverManagerDataSource.setUsername("gisli");
	    driverManagerDataSource.setPassword("gisli.123");
	    System.out.println("Finished initializing mysql...");
	    return driverManagerDataSource;
	}
	*/
}