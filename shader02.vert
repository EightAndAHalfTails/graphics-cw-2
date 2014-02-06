#version 150 compatibility

////////////////
//exercise 2
uniform vec4 ambientColor;
uniform vec4 diffuseColor;
uniform vec4 specularColor;
uniform float specularExponent;
uniform int shader;

out vertexData
{
  vec3 pos;
  vec3 normal;
  vec4 color;
}vertex;

/////////////

void main()
{
  vertex.pos = vec3(gl_ModelViewMatrix * gl_Vertex);
  vertex.normal = normalize(gl_NormalMatrix * gl_Normal);
  gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
  vertex.color = vec4(1.0,0.0,0.0,1.0);
	
  if(shader == 1)
    {
      //////////////////////////////
      //exercise 2.1 Gouraud shading
      //TODO add your code here
      vec3 lpos = gl_LightSource[0].position.xyz;
      float d = distance(lpos, vertex.pos);

      vec3 n = vertex.normal;
      vec3 l = lpos - vertex.pos;
      vec3 e = normalize(vertex.pos - l);
      vec3 r = reflect(l, n);
      float mu = 0.3;
      

      float attenuation = 1.0 / (gl_LightSource[0].constantAttenuation
				 + gl_LightSource[0].linearAttenuation * d
				 + gl_LightSource[0].quadraticAttenuation * d * d);

      vec4 Ia = ambientColor;
      vec4 Id = attenuation * diffuseColor * dot(n, l);
      vec4 Is = attenuation * specularColor * pow(dot(e, r), mu*specularExponent);

      vec4 I = Ia + Id; + Is;
      vertex.color = I;
      //////////////////////////////
    }



}
