package gisli;

import org.bson.BsonReader;
import org.bson.BsonWriter;
import org.bson.codecs.Codec;
import org.bson.codecs.DecoderContext;
import org.bson.codecs.EncoderContext;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import gisli.model.Test;

public class TestCodec implements Codec<Test> {
    public void encode( BsonWriter writer, Test value, EncoderContext encoderContext) {
        Gson gson = new GsonBuilder().create();
        String str = gson.toJson(value);
        System.out.println( "Test: " + str );
        writer.writeInt32(99);
    }

    public Test decode(final BsonReader reader, final DecoderContext decoderContext) {
        Gson gson = new GsonBuilder().create();
        String str = reader.readString();
        Test t = gson.fromJson( str,  Test.class );
        return t;
    }

    public Class<Test> getEncoderClass() {
        return Test.class;
    }

}
